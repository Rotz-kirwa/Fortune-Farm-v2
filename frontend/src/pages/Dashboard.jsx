import { TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';
import { useBalance } from '../context/BalanceContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReferralSection from '../components/ReferralSection';

const Dashboard = () => {
  const { balance, totalInvestment, dailyGrowth, referralEarnings, addReferralCommission } = useBalance();
  const [referralAmount, setReferralAmount] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 uppercase italic">Fortune Farm Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Balance</p>
                <p className="text-2xl font-bold text-white animate-pulse">KES {balance.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Daily Growth</p>
                <p className="text-2xl font-bold text-green-600 animate-pulse">+KES {dailyGrowth.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex items-center">
              <PieChart className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Investment</p>
                <p className="text-2xl font-bold text-white">KES {totalInvestment.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Referral Earnings</p>
                <p className="text-2xl font-bold text-green-600">+KES {referralEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div className="mb-8">
          <ReferralSection />
        </div>

        {/* Portfolio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Recent Investments</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-medium text-white">Apple Inc. (AAPL)</p>
                  <p className="text-sm text-gray-400">10 shares</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+$125.50</p>
                  <p className="text-sm text-gray-400">+2.3%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-medium text-white">Tesla Inc. (TSLA)</p>
                  <p className="text-sm text-gray-400">5 shares</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-$45.20</p>
                  <p className="text-sm text-gray-400">-1.8%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/deposit')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Invest Now
              </button>
              
              <div>
                <input
                  type="number"
                  placeholder="Referral investment amount"
                  value={referralAmount}
                  onChange={(e) => setReferralAmount(e.target.value)}
                  className="w-full px-3 py-2 mb-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:border-blue-500"
                />
                <button 
                  onClick={() => {
                    if (referralAmount && referralAmount > 0) {
                      const commission = addReferralCommission(parseFloat(referralAmount));
                      alert(`Referral commission earned: KES ${commission.toFixed(2)}`);
                      setReferralAmount('');
                    }
                  }}
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 hover:bg-opacity-10 transition"
                >
                  Add Referral
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/deposit')}
                className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;