import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [referredBy, setReferredBy] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferredBy(ref);
    }
  }, [searchParams]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('API_BASE_URL:', 'http://fortune-env.eba-hv84drhk.ap-south-1.elasticbeanstalk.com/api');
      console.log('Registering with:', formData);
      
      // Test API connection first
      const testResponse = await fetch('http://fortune-env.eba-hv84drhk.ap-south-1.elasticbeanstalk.com/api/test');
      console.log('Test response status:', testResponse.status);
      
      const response = await authAPI.register(formData);
      console.log('Registration response:', response);
      login(response.data);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error details:', err.response);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          {referredBy && (
            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-600 rounded-lg text-center">
              <p className="text-green-200 text-sm">
                🎉 You were referred by: <span className="font-semibold">{referredBy}</span>
              </p>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-orange-600 hover:text-orange-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;