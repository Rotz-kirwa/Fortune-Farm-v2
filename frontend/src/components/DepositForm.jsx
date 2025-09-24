import { useState } from 'react';
import { mpesaAPI } from '../services/mpesa';

const DepositForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ phoneNumber: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await mpesaAPI.initiatePayment(formData.phoneNumber, formData.amount);
      
      if (response.data.success) {
        alert('STK Push sent! Check your phone to complete payment.');
        setFormData({ phoneNumber: '', amount: '' });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Deposit via M-Pesa</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="254712345678"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Amount (KES)
          </label>
          <input
            type="number"
            min="1"
            placeholder="100"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-400">
        <p>• You'll receive an STK push on your phone</p>
        <p>• Enter your M-Pesa PIN to complete</p>
        <p>• Funds will reflect in your account instantly</p>
      </div>
    </div>
  );
};

export default DepositForm;