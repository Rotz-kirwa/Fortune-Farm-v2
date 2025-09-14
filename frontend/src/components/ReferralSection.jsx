import { useState } from 'react';
import { Copy, Share2, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReferralSection = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const userName = user?.user?.name || 'user';
  const referralLink = `https://fortunefarm.com/register?ref=${userName.toLowerCase().replace(/\s+/g, '')}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Fortune Farm',
        text: `Join me on Fortune Farm and start earning! Use my referral link to get started.`,
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <Users className="w-6 h-6 text-purple-500 mr-2" />
        <h3 className="text-xl font-semibold text-white">Referral Program</h3>
      </div>
      
      <p className="text-gray-400 mb-4">
        Earn 10% commission on every referral investment. Share your link and start earning!
      </p>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Your Referral Link:</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center space-x-1"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
      
      <button
        onClick={shareReferral}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center justify-center space-x-2"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Referral Link</span>
      </button>
      
      <div className="mt-4 p-3 bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg">
        <p className="text-purple-200 text-sm">
          💰 Earn KES for every friend who invests using your link!
        </p>
      </div>
    </div>
  );
};

export default ReferralSection;