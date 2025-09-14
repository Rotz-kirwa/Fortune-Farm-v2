import { useState, useEffect } from 'react';

const LiveUsersTable = () => {
  const allNames = [
    'Brian', 'Mercy', 'Kelvin', 'Sharon', 'Daniel', 'Faith', 'Samuel', 'Cynthia', 'George', 'Mary',
    'Evans', 'Stella', 'Peter', 'Lucy', 'Alex', 'Agnes', 'Michael', 'Rose', 'Vincent', 'Joyce',
    'Moses', 'Janet', 'Elijah', 'Caroline', 'Collins', 'Irene', 'David', 'Beatrice', 'James', 'Dorcas',
    'Anthony', 'Betty', 'Julius', 'Millicent', 'Fredrick', 'Ann', 'Patrick', 'Esther', 'Eric', 'Florence',
    'Stephen', 'Naomi', 'Kennedy', 'Sarah', 'Charles', 'Lydia', 'Paul', 'Eunice', 'Nelson', 'Vivian',
    'Oscar', 'Grace', 'Victor', 'Ruth', 'Bernard', 'Catherine', 'Felix', 'Alice', 'Jared', 'Hellen',
    'Allan', 'Monica', 'Isaac', 'Lilian', 'Kevin', 'Phyllis', 'Francis', 'Joseph', 'Mark', 'Gideon',
    'Dennis', 'Leah', 'Simon', 'Violet', 'Derrick', 'Diana', 'Elvis', 'Emmanuel', 'Raymond', 'Gladys',
    'Nicholas', 'Miriam', 'Chris', 'Lawrence', 'Brenda', 'Steve', 'Peris', 'Susan', 'Thomas', 'Martha',
    'Robert', 'Elizabeth', 'William', 'Margaret', 'Richard', 'Linda', 'John', 'Patricia', 'Matthew', 'Jennifer'
  ];
  
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

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Investment</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Payout</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
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
                <td className="px-4 py-3 text-gray-300">{user.name}</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  KES {user.investment.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  KES {Math.floor(user.investment * 3.5).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.status === 'Paid' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white animate-pulse'
                  }`}>
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