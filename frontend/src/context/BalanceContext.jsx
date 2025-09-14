import { createContext, useContext, useState, useEffect } from 'react';

const BalanceContext = createContext();

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [dailyGrowth, setDailyGrowth] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);

  // Simulate daily growth (2% per day)
  useEffect(() => {
    if (totalInvestment > 0) {
      const interval = setInterval(() => {
        const dailyReturn = totalInvestment * 0.02; // 2% daily return
        setDailyGrowth(prev => prev + dailyReturn);
        setBalance(prev => prev + dailyReturn);
      }, 5000); // Update every 5 seconds for demo (in real app, this would be daily)

      return () => clearInterval(interval);
    }
  }, [totalInvestment]);

  const invest = (amount) => {
    setTotalInvestment(prev => prev + amount);
    setBalance(prev => prev + amount);
  };

  const addReferralCommission = (amount) => {
    const commission = amount * 0.1; // 10% commission
    setReferralEarnings(prev => prev + commission);
    setBalance(prev => prev + commission);
    return commission;
  };

  const withdraw = (amount) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <BalanceContext.Provider value={{
      balance,
      totalInvestment,
      dailyGrowth,
      referralEarnings,
      invest,
      addReferralCommission,
      withdraw
    }}>
      {children}
    </BalanceContext.Provider>
  );
};