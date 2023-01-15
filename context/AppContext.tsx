import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [currentPage, setCurrentPage] = useState(null);

  const sharedState = {
    currentPage,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
