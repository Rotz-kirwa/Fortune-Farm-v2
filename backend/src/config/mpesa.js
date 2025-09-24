const axios = require('axios');

const MPESA_CONFIG = {
  consumer_key: process.env.MPESA_CONSUMER_KEY || 'QrUdWSBOAgCC8Ky60sGssRAA9NnNuy8rDxrWYGoBIEIOcxqn',
  consumer_secret: process.env.MPESA_CONSUMER_SECRET || 'AXzu4uZeYD3GnFOTK9w8jnI0VjqC8R6LpKnGW0kgPaENuqvaJjAazi9J3KbfqBTz',
  business_short_code: '4185659',
  passkey: process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  callback_url: process.env.MPESA_CALLBACK_URL || 'https://fortune-farm.onrender.com/api/mpesa/callback',
  base_url: 'https://sandbox.safaricom.co.ke'
};

const getAccessToken = async () => {
  const auth = Buffer.from(`${MPESA_CONFIG.consumer_key}:${MPESA_CONFIG.consumer_secret}`).toString('base64');
  
  const response = await axios.get(`${MPESA_CONFIG.base_url}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  
  return response.data.access_token;
};

module.exports = { MPESA_CONFIG, getAccessToken };