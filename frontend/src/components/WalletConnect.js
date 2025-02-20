import React from 'react';
import { useWallet } from '../context/WalletContext';
import styled from 'styled-components';

const WalletButton = styled.button`
  background: ${props => {
    switch (props.variant) {
      case 'unisat': return '#F7931A';
      case 'leather': return '#6B47ED';
      default: return '#1E88E5';
    }
  }};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const WalletAddress = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const DisconnectButton = styled.button`
  background: none;
  border: none;
  color: #FF4444;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 68, 68, 0.1);
  }
`;

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const WalletIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const WalletConnect = () => {
  const { 
    walletAddress, 
    connected, 
    walletType,
    connectXverse, 
    connectUnisat,
    connectLeather,
    disconnect 
  } = useWallet();

  if (connected && walletAddress) {
    return (
      <WalletContainer>
        <WalletIcon 
          src={
            walletType === 'unisat' 
              ? '/unisat-logo.png'
              : walletType === 'leather'
                ? '/leather-logo.png'
                : '/xverse-logo.png'
          } 
          alt={`${walletType} wallet`} 
        />
        <WalletAddress>
          {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          <DisconnectButton onClick={disconnect}>
            Disconnect
          </DisconnectButton>
        </WalletAddress>
      </WalletContainer>
    );
  }

  return (
    <WalletContainer>
      <WalletButton onClick={connectXverse}>
        Connect Xverse
      </WalletButton>
      <WalletButton variant="unisat" onClick={connectUnisat}>
        Connect Unisat
      </WalletButton>
      <WalletButton variant="leather" onClick={connectLeather}>
        Connect Leather
      </WalletButton>
    </WalletContainer>
  );
};

export default WalletConnect;