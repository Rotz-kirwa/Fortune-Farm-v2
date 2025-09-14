import { useState, useEffect } from 'react';
import { allNames } from '../data/names';

const LiveUsersTable = () => {
  
  const [users, setUsers] = useState([]);
  const [usedNames, setUsedNames] = useState(new Set());
  const [availableNames, setAvailableNames] = useState([...allNames]);

  const generateUser = () => {
    if (availableNames.length === 0) {
      setAvailableNames([...allNames]);
      setUsedNames(new Set());
    }
    
    const nameIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[nameIndex];
    
    setAvailableNames(prev => prev.filter((_, index) => index !== nameIndex));
    setUsedNames(prev => new Set([...prev, selectedName]));
    
    return {
      name: selectedName,
      investment: Math.floor(Math.random() * 2900) + 100,
      status: Math.random() > 0.3 ? 'Paid' : 'Processing',
      stage: Math.random() > 0.3 ? 2 : 1,
      createdAt: Date.now(),
      id: Math.random()
    };
  };

  useEffect(() => {
    // Initialize with 15 users
    const initialUsers = Array.from({ length: 15 }, generateUser);
    setUsers(initialUsers);

    // Add new user every 3 seconds and remove oldest
    const interval = setInterval(() => {
      setUsers(prev => {
        const newUsers = [...prev];
        newUsers.shift(); // Remove first user
        newUsers.push(generateUser()); // Add new user at end
        return newUsers;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Progress from Processing (Big Chance payout) to Paid (amount payout)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setUsers(prev => 
        prev.map(user => {
          if (user.stage === 1 && (now - user.createdAt) >= 4000) {
            return { ...user, stage: 2, status: 'Paid' };
          }
          return user;
        })
      );
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="max-h-96 overflow-y-auto overflow-x-auto">
        <table className="w-full min-w-full table-auto">
          <thead className="bg-gray-700 sticky top-0">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-left text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Name</th>
              <th className="px-2 sm:px-4 py-3 text-left text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Investment</th>
              <th className="px-2 sm:px-4 py-3 text-left text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Payout</th>
              <th className="px-2 sm:px-4 py-3 text-left text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.id} 
                className={`border-b border-gray-700 hover:bg-gray-800 transition-all duration-500 ${
                  index === users.length - 1 ? 'animate-pulse bg-gray-800' : ''
                }`}
              >
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap">{user.name}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-green-400 font-semibold text-xs sm:text-sm whitespace-nowrap">
                  KES {user.investment.toLocaleString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-green-400 font-semibold text-xs sm:text-sm whitespace-nowrap">
                  {user.stage === 1 ? (
                    <span className="text-yellow-400 animate-pulse">Big Chance</span>
                  ) : (
                    `KES ${Math.floor(user.investment * 3.5).toLocaleString()}`
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <span className={`px-1 sm:px-2 py-1 rounded text-xs ${
                    user.status === 'Paid' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 text-white animate-pulse'
                  } whitespace-nowrap`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveUsersTable;