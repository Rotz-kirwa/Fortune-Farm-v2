import api from './api';

export const mpesaAPI = {
  initiatePayment: (phoneNumber, amount) => 
    api.post('/mpesa/stkpush', { phone_number: phoneNumber, amount }),
  
  getTransactions: () => 
    api.get('/mpesa/transactions')
};

export default mpesaAPI;