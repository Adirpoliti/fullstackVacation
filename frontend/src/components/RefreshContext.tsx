import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RefreshContextType {
  refreshTrigger: boolean;
  toggleRefreshTrigger: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const toggleRefreshTrigger = () => {
    setRefreshTrigger(prev => !prev);
  };

  return (
    <RefreshContext.Provider value={{ refreshTrigger, toggleRefreshTrigger }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
