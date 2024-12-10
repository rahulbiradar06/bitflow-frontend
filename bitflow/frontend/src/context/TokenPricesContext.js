import React, { createContext, useContext, useState, useCallback } from 'react';
import { getTokenPrice } from '../utils/priceFeed';

const TokenPricesContext = createContext();

export const TokenPricesProvider = ({ children }) => {
  const getPriceForPair = useCallback(async (token1Symbol, token2Symbol) => {
    try {
      const [price1, price2] = await Promise.all([
        getTokenPrice(token1Symbol),
        getTokenPrice(token2Symbol)
      ]);
      return price1 / price2;
    } catch (error) {
      console.error('Error getting price for pair:', error);
      return null;
    }
  }, []);

  const value = {
    getPriceForPair
  };

  return (
    <TokenPricesContext.Provider value={value}>
      {children}
    </TokenPricesContext.Provider>
  );
};

export const useTokenPrices = () => {
  const context = useContext(TokenPricesContext);
  if (context === undefined) {
    throw new Error('useTokenPrices must be used within a TokenPricesProvider');
  }
  return context;
}; 