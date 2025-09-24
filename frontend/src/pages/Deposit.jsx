import { useState } from 'react';
import { Smartphone, Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useBalance } from '../context/BalanceContext';
import TestMpesa from '../components/TestMpesa';

const Deposit = () => {
  const { balance, invest } = useBalance();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handleDeposit = async () => {
    if (!amount || !phoneNumber) {
      alert('Please enter amount and phone number');
      return;
    }
    
    try {
      const { mpesaAPI } = await import('../services/mpesa');
      const response = await mpesaAPI.initiatePayment(phoneNumber, amount);
      
      if (response.data.success) {
        alert(`STK Push sent to ${phoneNumber} for KES ${amount}. Check your phone to complete payment.`);
        setAmount('');
        setPhoneNumber('');
        setSelectedAmount('');
      }
    } catch (error) {
      alert('Payment failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleWithdraw = () => {
    alert('Insufficient balance for withdrawal');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <TestMpesa />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Deposit Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-6">
              <ArrowUpCircle className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Deposits</h2>
            </div>
            
            <p className="text-gray-400 mb-6">Top up your wallet</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Select an amount</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt.toString());
                      setSelectedAmount(amt.toString());
                    }}
                    className={`p-2 sm:p-3 rounded-lg border transition text-sm sm:text-base ${
                      selectedAmount === amt.toString()
                        ? 'border-green-500 bg-green-500 bg-opacity-20 text-green-400'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    KES {amt}
                  </button>
                ))}
              </div>
              
              <input
                type="number"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedAmount('');
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            
            <p className="text-sm text-gray-400 mb-6">Commissions are calculated on your deposit</p>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Phone Number to receive STK Push</label>
              <input
                type="tel"
                placeholder="254........"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            
            <button
              onClick={handleDeposit}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4"
            >
              Deposit
            </button>
            
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg">
                <Smartphone className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">M-PESA</span>
              </div>
            </div>
          </div>
          
          {/* Balance & Withdrawal Section */}
          <div className="space-y-6">
            
            {/* Current Balance */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Wallet className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">Current Balance</h3>
              </div>
              <p className="text-3xl font-bold text-green-400 animate-pulse">KES {balance.toFixed(2)}</p>
            </div>
            
            {/* Withdrawals */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <ArrowDownCircle className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">Withdrawals</h3>
              </div>
              
              <p className="text-gray-400 mb-4">
                To withdraw you need to have a minimum wallet balance of KES 1200
              </p>
              
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="KES 0.0"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-red-500"
                  disabled
                />
              </div>
              
              <button
                onClick={handleWithdraw}
                disabled
                className="w-full bg-gray-600 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;