const express = require('express');
const axios = require('axios');
const { MPESA_CONFIG, getAccessToken } = require('../config/mpesa');
const { initDatabase } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'M-Pesa routes working', timestamp: new Date().toISOString() });
});

// STK Push - Initiate payment
router.post('/stkpush', auth, async (req, res) => {
  try {
    const { phone_number, amount } = req.body;
    const user_id = req.user.id;
    
    if (!phone_number || !amount) {
      return res.status(400).json({ message: 'Phone number and amount required' });
    }

    const access_token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_CONFIG.business_short_code}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');
    
    const transaction_id = `FT${Date.now()}${user_id}`;
    
    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.business_short_code,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone_number,
      PartyB: MPESA_CONFIG.business_short_code,
      PhoneNumber: phone_number,
      CallBackURL: MPESA_CONFIG.callback_url,
      AccountReference: transaction_id,
      TransactionDesc: 'Fortune Farm Deposit'
    };

    const response = await axios.post(
      `${MPESA_CONFIG.base_url}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Save transaction to database
    const db = await initDatabase();
    await db.run(
      'INSERT INTO transactions (user_id, transaction_id, phone_number, amount, type) VALUES (?, ?, ?, ?, ?)',
      [user_id, transaction_id, phone_number, amount, 'deposit']
    );

    res.json({
      success: true,
      message: 'STK Push sent successfully',
      transaction_id,
      checkout_request_id: response.data.CheckoutRequestID
    });

  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Payment initiation failed',
      error: error.response?.data || error.message 
    });
  }
});

// M-Pesa Callback
router.post('/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    
    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;
    
    if (ResultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata.Item;
      const amount = metadata.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value;
      
      const db = await initDatabase();
      
      // Update transaction status
      await db.run(
        'UPDATE transactions SET status = ?, mpesa_receipt_number = ? WHERE phone_number = ? AND amount = ? AND status = ?',
        ['completed', mpesaReceiptNumber, phoneNumber, amount, 'pending']
      );
      
      // Update user balance
      const transaction = await db.get(
        'SELECT user_id FROM transactions WHERE phone_number = ? AND amount = ? AND status = ?',
        [phoneNumber, amount, 'completed']
      );
      
      if (transaction) {
        await db.run(
          'UPDATE users SET balance = balance + ? WHERE id = ?',
          [amount, transaction.user_id]
        );
      }
      
    } else {
      // Payment failed
      const db = await initDatabase();
      await db.run(
        'UPDATE transactions SET status = ? WHERE checkout_request_id = ?',
        ['failed', CheckoutRequestID]
      );
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ success: false });
  }
});

// Get user transactions
router.get('/transactions', auth, async (req, res) => {
  try {
    const db = await initDatabase();
    const transactions = await db.all(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

module.exports = router;