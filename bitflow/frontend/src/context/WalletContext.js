import React, { createContext, useState, useContext } from "react";
import { connectXverseWallet, signTransaction } from "../utils/xverseUtils";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const address = await connectXverseWallet();
      setWalletAddress(address);
      setConnected(true);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        connected,
        connectWallet,
        disconnectWallet,
        signTransaction, // Export transaction signing function
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);