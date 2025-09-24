console.log('Loading app.js v3.0 with M-Pesa...');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log('Express and dependencies loaded');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
console.log('Express app created');

app.use(cors({
  origin: [
    "https://fortune-farm-murex.vercel.app",
    "https://fortune-farm-git-main-eliuds-projects-ebf8c589.vercel.app",
    "https://fortune-farm-6ci3e05b5-eliuds-projects-ebf8c589.vercel.app",
    "https://fortune-farm-l762.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// M-Pesa routes
app.get('/api/mpesa/test', (req, res) => {
  res.json({ message: 'M-Pesa endpoint working', timestamp: new Date().toISOString() });
});

app.post('/api/mpesa/callback', async (req, res) => {
  try {
    console.log('M-Pesa Callback received:', JSON.stringify(req.body, null, 2));
    
    const { Body } = req.body;
    if (Body && Body.stkCallback) {
      const { ResultCode, CallbackMetadata } = Body.stkCallback;
      
      if (ResultCode === 0 && CallbackMetadata) {
        // Payment successful
        const metadata = CallbackMetadata.Item;
        const amount = metadata.find(item => item.Name === 'Amount')?.Value;
        const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value;
        const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        
        console.log(`Payment successful: ${amount} KES from ${phoneNumber}, Receipt: ${mpesaReceiptNumber}`);
        
        // Here you would update user balance in database
        // For now, just log the success
      } else {
        console.log('Payment failed or cancelled');
      }
    }
    
    res.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('Callback error:', error);
    res.json({ ResultCode: 1, ResultDesc: 'Error' });
  }
});

app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { phone_number, amount } = req.body;
    
    if (!phone_number || !amount) {
      return res.status(400).json({ message: 'Phone number and amount required' });
    }

    const MPESA_CONFIG = {
      consumer_key: 'QrUdWSBOAgCC8Ky60sGssRAA9NnNuy8rDxrWYGoBIEIOcxqn',
      consumer_secret: 'AXzu4uZeYD3GnFOTK9w8jnI0VjqC8R6LpKnGW0kgPaENuqvaJjAazi9J3KbfqBTz',
      business_short_code: '174379',
      passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      base_url: 'https://sandbox.safaricom.co.ke'
    };

    const axios = require('axios');
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
      CallBackURL: 'https://fortune-farm.onrender.com/api/mpesa/callback',
      AccountReference: `FT${Date.now()}`,
      TransactionDesc: 'Fortune Farm Deposit'
    };

    const stkUrl = `${MPESA_CONFIG.base_url}/mpesa/stkpush/v1/processrequest`;
    console.log('STK Push URL:', stkUrl);
    
    const response = await axios.post(stkUrl, stkPushData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      message: 'STK Push sent successfully',
      checkout_request_id: response.data.CheckoutRequestID
    });

  } catch (error) {
    console.error('=== STK Push Error Details ===');
    console.error('Error message:', error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request URL:', error.config?.url);
    console.error('Request data:', JSON.stringify(error.config?.data, null, 2));
    
    res.status(500).json({ 
      success: false, 
      message: 'Payment initiation failed',
      error: error.response?.data || error.message,
      details: {
        status: error.response?.status,
        url: error.config?.url
      }
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.json({ message: 'Fortune Farm API Server with M-Pesa', status: 'running', mpesa: 'enabled' });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working', 
    mpesa_routes: 'loaded',
    timestamp: new Date().toISOString() 
  });
});

app.get('/api/status', (req, res) => {
  res.json({ 
    server: 'Fortune Farm',
    mpesa: 'integrated',
    routes: ['/api/mpesa/test', '/api/mpesa/stkpush'],
    timestamp: new Date().toISOString() 
  });
});

// Temporary endpoint to add balance for testing
app.post('/api/test/add-balance', (req, res) => {
  const { amount } = req.body;
  console.log(`Test: Adding ${amount} KES to user balance`);
  res.json({ 
    success: true, 
    message: `Added ${amount} KES to balance`,
    note: 'This is a test endpoint - in production, balance updates via M-Pesa callback'
  });
});

console.log('App configuration complete');
module.exports = app;