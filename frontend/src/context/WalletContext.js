import React, { createContext, useContext, useState } from 'react';
import { connectXverseWallet, signXverseTransaction } from '../utils/xverseUtils';
import { connectLeatherWallet, signLeatherTransaction, isLeatherConnected } from '../utils/leatherUtils';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [connected, setConnected] = useState(false);
  const [walletType, setWalletType] = useState(null); // 'xverse', 'unisat', or 'leather'

  const connectXverse = async () => {
    try {
      const address = await connectXverseWallet();
      setWalletAddress(address);
      setConnected(true);
      setWalletType('xverse');
    } catch (error) {
      console.error("Error connecting to Xverse:", error);
    }
  };

  const connectUnisat = async () => {
    try {
      if (typeof window.unisat === 'undefined') {
        alert('Please install Unisat Wallet first!');
        return;
      }

      const accounts = await window.unisat.requestAccounts();
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setConnected(true);
        setWalletType('unisat');
      }
    } catch (error) {
      console.error("Error connecting to Unisat:", error);
    }
  };

  const connectLeather = async () => {
    try {
      if (typeof window.StacksProvider === 'undefined') {
        alert('Please install Leather Wallet first!');
        return;
      }

      // First check if already connected
      const isConnected = await isLeatherConnected();
      if (isConnected) {
        const accounts = await window.StacksProvider.getAddresses();
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setConnected(true);
          setWalletType('leather');
          return;
        }
      }

      // If not connected, try to connect
      const address = await connectLeatherWallet();
      if (address) {
        setWalletAddress(address);
        setConnected(true);
        setWalletType('leather');
      }
    } catch (error) {
      console.error("Error connecting to Leather:", error);
      alert('Failed to connect to Leather wallet. Please try again.');
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setConnected(false);
    setWalletType(null);
  };

  const signTransaction = async (unsignedTx) => {
    try {
      if (!connected) throw new Error("Wallet not connected");

      switch (walletType) {
        case 'xverse':
          return await signXverseTransaction(unsignedTx);
        case 'unisat':
          return await window.unisat.signPsbt(unsignedTx);
        case 'leather':
          return await signLeatherTransaction(unsignedTx);
        default:
          throw new Error("Unknown wallet type");
      }
    } catch (error) {
      console.error("Error signing transaction:", error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider value={{
      walletAddress,
      connected,
      walletType,
      connectXverse,
      connectUnisat,
      connectLeather,
      disconnect,
      signTransaction
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);