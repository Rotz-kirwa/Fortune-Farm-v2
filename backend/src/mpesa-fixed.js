// Fixed M-Pesa STK Push Implementation
const axios = require('axios');

const MPESA_CONFIG = {
  consumer_key: 'QrUdWSBOAgCC8Ky60sGssRAA9NnNuy8rDxrWYGoBIEIOcxqn',
  consumer_secret: 'AXzu4uZeYD3GnFOTK9w8jnI0VjqC8R6LpKnGW0kgPaENuqvaJjAazi9J3KbfqBTz',
  business_short_code: '174379',
  passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  base_url: 'https://sandbox.safaricom.co.ke'
};

const stkPush = async (req, res) => {
  try {
    console.log('STK Push request:', req.body);
    const { phone_number, amount } = req.body;
    const userId = req.userId;

    if (!phone_number || !amount) {
      return res.status(400).json({ message: 'Phone number and amount required' });
    }

    // Get M-Pesa access token
    const auth = Buffer.from(`${MPESA_CONFIG.consumer_key}:${MPESA_CONFIG.consumer_secret}`).toString('base64');
    
    const tokenResponse = await axios.get(`${MPESA_CONFIG.base_url}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: { Authorization: `Basic ${auth}` }
    });
    
    const access_token = tokenResponse.data.access_token;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_CONFIG.business_short_code}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');
    
    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.business_short_code,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone_number,
      PartyB: MPESA_CONFIG.business_short_code,
      PhoneNumber: phone_number,
      CallBackURL: 'http://localhost:5000/api/mpesa/callback',
      AccountReference: `FIXGOAL_${userId}_${Date.now()}`,
      TransactionDesc: 'Fortune Farm Deposit'
    };

    const response = await axios.post(`${MPESA_CONFIG.base_url}/mpesa/stkpush/v1/processrequest`, stkPushData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('STK Push successful:', response.data);
    res.json({
      success: true,
      message: 'STK Push sent successfully',
      checkout_request_id: response.data.CheckoutRequestID
    });

  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Payment initiation failed',
      error: error.response?.data || error.message
    });
  }
};

module.exports = { stkPush };