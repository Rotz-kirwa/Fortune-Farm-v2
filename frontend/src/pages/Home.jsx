import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Users } from 'lucide-react';
import LiveChart from '../components/LiveChart';
import LiveUsersTable from '../components/LiveUsersTable';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section>
        <img 
          src="https://www.dropbox.com/scl/fi/jub3petorwv8sdt30rehx/sol-1.jpg?rlkey=79ja6w6l9ipxh2ak5p8x2j4pp&st=82bsc4vb&raw=1" 
          alt="Investment Hero" 
          className="w-full mt-16 sm:mt-20"
          loading="eager"
          decoding="async"
        />
      </section>

      {/* Scrolling Withdrawals Ticker */}
      <div className="bg-green-600 py-2 sm:py-3 overflow-hidden">
        <div className="flex animate-scroll-continuous whitespace-nowrap">
          <div className="flex items-center space-x-12 text-white text-sm min-w-max">
            <div className="text-center"><div>+254796-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4077</div></div>
            <div className="text-center"><div>+254711-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1386</div></div>
            <div className="text-center"><div>+254789-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4944</div></div>
            <div className="text-center"><div>+254780-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2156</div></div>
            <div className="text-center"><div>+254722-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3287</div></div>
            <div className="text-center"><div>+254733-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5643</div></div>
            <div className="text-center"><div>+254745-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1892</div></div>
            <div className="text-center"><div>+254756-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4321</div></div>
            <div className="text-center"><div>+254767-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2765</div></div>
            <div className="text-center"><div>+254778-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3498</div></div>
            <div className="text-center"><div>+254701-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5127</div></div>
            <div className="text-center"><div>+254712-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1654</div></div>
            <div className="text-center"><div>+254723-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4876</div></div>
            <div className="text-center"><div>+254734-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2943</div></div>
            <div className="text-center"><div>+254746-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3765</div></div>
            <div className="text-center"><div>+254757-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1287</div></div>
            <div className="text-center"><div>+254768-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5432</div></div>
            <div className="text-center"><div>+254779-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2198</div></div>
            <div className="text-center"><div>+254702-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4567</div></div>
            <div className="text-center"><div>+254713-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3421</div></div>
            <div className="text-center"><div>+254724-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1876</div></div>
            <div className="text-center"><div>+254735-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5234</div></div>
            <div className="text-center"><div>+254747-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2987</div></div>
            <div className="text-center"><div>+254758-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4123</div></div>
            <div className="text-center"><div>+254769-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1765</div></div>
            <div className="text-center"><div>+254703-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3654</div></div>
            <div className="text-center"><div>+254714-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2432</div></div>
            <div className="text-center"><div>+254725-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5876</div></div>
            <div className="text-center"><div>+254736-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1543</div></div>
            <div className="text-center"><div>+254748-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4321</div></div>
            <div className="text-center"><div>+254759-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2876</div></div>
            <div className="text-center"><div>+254704-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3987</div></div>
            <div className="text-center"><div>+254715-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1234</div></div>
            <div className="text-center"><div>+254726-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5432</div></div>
            <div className="text-center"><div>+254737-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2765</div></div>
            <div className="text-center"><div>+254749-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4198</div></div>
            <div className="text-center"><div>+254705-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3456</div></div>
            <div className="text-center"><div>+254716-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1987</div></div>
            <div className="text-center"><div>+254727-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5123</div></div>
            <div className="text-center"><div>+254738-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2654</div></div>
            <div className="text-center"><div>+254706-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4876</div></div>
            <div className="text-center"><div>+254717-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3321</div></div>
            <div className="text-center"><div>+254728-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1765</div></div>
            <div className="text-center"><div>+254739-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5987</div></div>
            <div className="text-center"><div>+254707-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2432</div></div>
            <div className="text-center"><div>+254718-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4123</div></div>
            <div className="text-center"><div>+254729-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3654</div></div>
            <div className="text-center"><div>+254708-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1876</div></div>
            <div className="text-center"><div>+254719-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5234</div></div>
            <div className="text-center"><div>+254709-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2987</div></div>
            <div className="text-center"><div>+254710-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4567</div></div>
          </div>
          <div className="flex items-center space-x-12 text-white text-sm min-w-max">
            <div className="text-center"><div>+254796-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4077</div></div>
            <div className="text-center"><div>+254711-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1386</div></div>
            <div className="text-center"><div>+254789-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4944</div></div>
            <div className="text-center"><div>+254780-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2156</div></div>
            <div className="text-center"><div>+254722-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3287</div></div>
            <div className="text-center"><div>+254733-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5643</div></div>
            <div className="text-center"><div>+254745-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1892</div></div>
            <div className="text-center"><div>+254756-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4321</div></div>
            <div className="text-center"><div>+254767-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2765</div></div>
            <div className="text-center"><div>+254778-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3498</div></div>
            <div className="text-center"><div>+254701-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5127</div></div>
            <div className="text-center"><div>+254712-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1654</div></div>
            <div className="text-center"><div>+254723-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4876</div></div>
            <div className="text-center"><div>+254734-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2943</div></div>
            <div className="text-center"><div>+254746-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3765</div></div>
            <div className="text-center"><div>+254757-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1287</div></div>
            <div className="text-center"><div>+254768-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5432</div></div>
            <div className="text-center"><div>+254779-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2198</div></div>
            <div className="text-center"><div>+254702-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4567</div></div>
            <div className="text-center"><div>+254713-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 3421</div></div>
            <div className="text-center"><div>+254724-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1876</div></div>
            <div className="text-center"><div>+254735-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 5234</div></div>
            <div className="text-center"><div>+254747-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 2987</div></div>
            <div className="text-center"><div>+254758-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 4123</div></div>
            <div className="text-center"><div>+254769-XXXX-XX</div><div>just withdrew</div><div className="font-bold">KES 1765</div></div>
          </div>
        </div>
      </div>

      {/* Users Investment Table */}
      <section className="py-6 sm:py-8 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">Recent Investments & Payouts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <LiveUsersTable />
            
            <LiveChart />
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-4 sm:mb-6 lg:mb-8">How to Start Earning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-white font-bold text-lg sm:text-xl">1</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Sign Up & Verify</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Create account with name, email, password. Verify your identity for secure access.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Deposit & Invest</h3>
              <p className="text-gray-400 text-sm">Choose your investment amount. Higher investments unlock greater reward potential.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Refer & Earn</h3>
              <p className="text-gray-400 text-sm">Invite friends via referral link. Earn bonus rewards when they invest.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn Returns</h3>
              <p className="text-gray-400 text-sm">Your funds generate daily returns. More investment + referrals = bigger rewards.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Withdraw Funds</h3>
              <p className="text-gray-400 text-sm">Reach minimum threshold and request withdrawal to your account.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">6</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stay Active</h3>
              <p className="text-gray-400 text-sm">Keep investing and referring to maintain maximum earning potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white mb-6 sm:mb-8 lg:mb-12">
            Why Choose Fortune Farm?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-400">Bank-level security to protect your investments</p>
            </div>
            <div className="text-center p-6">
              <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Execution</h3>
              <p className="text-gray-400">Lightning-fast trades and real-time market data</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-400">24/7 support from financial experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">Join thousands of investors building wealth with Fortune Farm</p>
          <Link 
            to={user ? "/deposit" : "/register"}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            {user ? "Go to Account" : "Get Started Today"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;