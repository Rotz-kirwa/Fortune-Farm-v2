import { useState } from 'react';
import api from '../services/api';

const TestMpesa = () => {
  const [result, setResult] = useState('');

  const testMpesaEndpoint = async () => {
    try {
      const response = await api.get('/mpesa/test');
      setResult('✅ M-Pesa endpoint working: ' + JSON.stringify(response.data));
    } catch (error) {
      setResult('❌ M-Pesa endpoint failed: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mb-4">
      <button 
        onClick={testMpesaEndpoint}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
      >
        Test M-Pesa Endpoint
      </button>
      {result && <p className="text-white mt-2">{result}</p>}
    </div>
  );
};

export default TestMpesa;