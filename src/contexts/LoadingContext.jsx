import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [key]: isLoading }));
  };

  const isLoading = Object.values(loadingStates).some((state) => state);

  return (
    <LoadingContext.Provider value={{ loadingStates, setLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
