import React from "react";
import { useWallet } from "../context/WalletContext";
import { ConnectButton, WalletAddress } from "../styles/WalletStyles";

const WalletConnect = () => {
  const { walletAddress, connected, connectWallet, disconnectWallet } = useWallet();

  return (
    <>
      {!connected ? (
        <ConnectButton onClick={connectWallet}>
          Connect Xverse Wallet
        </ConnectButton>
      ) : (
        <WalletAddress onClick={disconnectWallet}>
          {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
        </WalletAddress>
      )}
    </>
  );
};

export default WalletConnect;