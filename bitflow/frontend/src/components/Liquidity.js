import React, { useState, useEffect } from 'react';
import { useWallet } from "../context/WalletContext";
import TokenSelectModal from "./TokenSelectModal";
import styled from 'styled-components';
import {
  SwapContainer,
  SwapHeader,
  SwapTitle,
  TokenInput,
  InputRow,
  Input,
  TokenSelect,
  TokenLogo,
  SwapButton,
} from "../styles/SwapStyles";
import { getTokenPrice, tokens } from '../utils/priceFeed';

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const PriceInfo = styled.div`
  background: rgba(13, 17, 28, 0.7);
  border-radius: 16px;
  margin-top: 16px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Liquidity = () => {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'remove'
  const [token1, setToken1] = useState({ symbol: "BTC", name: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" });
  const [token2, setToken2] = useState({ symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.png" });
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [isSelectingToken1, setIsSelectingToken1] = useState(false);
  const [isSelectingToken2, setIsSelectingToken2] = useState(false);
  const [token1Price, setToken1Price] = useState(null);
  const [token2Price, setToken2Price] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const updatePrices = async () => {
      const token1Data = tokens.find(t => t.symbol === token1.symbol);
      const token2Data = tokens.find(t => t.symbol === token2.symbol);
      
      if (token1Data && token2Data) {
        const [price1, price2] = await Promise.all([
          getTokenPrice(token1Data.coingeckoId),
          getTokenPrice(token2Data.coingeckoId)
        ]);
        
        if (price1 && price2) {
          const rate = price1 / price2;
          setConversionRate(rate);
          setToken1Price(price1);
          setToken2Price(price2);
          
          if (amount1) {
            setAmount2((parseFloat(amount1) * rate).toFixed(6));
          }
        }
      }
    };

    updatePrices();
  }, [token1.symbol, token2.symbol, amount1]);

  const handleAddLiquidity = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }
    // Add liquidity logic here
  };

  const handleRemoveLiquidity = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }
    // Remove liquidity logic here
  };

  const formatRate = (rate) => {
    if (!rate) return "Loading...";
    return `1 ${token1.symbol} = ${rate.toFixed(6)} ${token2.symbol}`;
  };

  return (
    <SwapContainer>
      <SwapHeader>
        <SwapTitle>Liquidity</SwapTitle>
      </SwapHeader>

      <TabContainer>
        <Tab 
          active={activeTab === 'add'} 
          onClick={() => setActiveTab('add')}
        >
          Add
        </Tab>
        <Tab 
          active={activeTab === 'remove'} 
          onClick={() => setActiveTab('remove')}
        >
          Remove
        </Tab>
      </TabContainer>

      {activeTab === 'add' ? (
        <>
          <TokenInput>
            <InputRow>
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
              <TokenSelect onClick={() => setIsSelectingToken1(true)}>
                <TokenLogo as="img" src={token1.logo} />
                {token1.symbol}
                ▼
              </TokenSelect>
            </InputRow>
          </TokenInput>

          <TokenInput>
            <InputRow>
              <Input
                type="number"
                placeholder="0.0"
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
              />
              <TokenSelect onClick={() => setIsSelectingToken2(true)}>
                <TokenLogo as="img" src={token2.logo} />
                {token2.symbol}
                ▼
              </TokenSelect>
            </InputRow>
          </TokenInput>

          <PriceInfo>
            <InfoRow>
              <span>Price:</span>
              <span>{formatRate(conversionRate)}</span>
            </InfoRow>
            <InfoRow>
              <span>USD Values:</span>
              <span>
                {token1Price && amount1 
                  ? `$${(token1Price * Number(amount1)).toLocaleString()}`
                  : '-'}
              </span>
            </InfoRow>
            <InfoRow>
              <span>Share of Pool:</span>
              <span>0.00%</span>
            </InfoRow>
          </PriceInfo>

          <SwapButton
            disabled={!connected || !amount1 || !amount2}
            onClick={handleAddLiquidity}
          >
            {!connected 
              ? "Connect Wallet" 
              : !amount1 || !amount2
                ? "Enter an amount" 
                : "Add Liquidity"}
          </SwapButton>
        </>
      ) : (
        <>
          <TokenInput>
            <InputRow>
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
              <span>LP Tokens</span>
            </InputRow>
          </TokenInput>

          <PriceInfo>
            <InfoRow>
              <span>Your Pool Tokens:</span>
              <span>0.00</span>
            </InfoRow>
            <InfoRow>
              <span>Pooled {token1.symbol}:</span>
              <span>0.00</span>
            </InfoRow>
            <InfoRow>
              <span>Pooled {token2.symbol}:</span>
              <span>0.00</span>
            </InfoRow>
            <InfoRow>
              <span>Your Pool Share:</span>
              <span>0.00%</span>
            </InfoRow>
          </PriceInfo>

          <SwapButton
            disabled={!connected || !amount1}
            onClick={handleRemoveLiquidity}
          >
            {!connected 
              ? "Connect Wallet" 
              : !amount1
                ? "Enter an amount" 
                : "Remove Liquidity"}
          </SwapButton>
        </>
      )}

      <TokenSelectModal
        isOpen={isSelectingToken1}
        onClose={() => setIsSelectingToken1(false)}
        onSelect={setToken1}
      />

      <TokenSelectModal
        isOpen={isSelectingToken2}
        onClose={() => setIsSelectingToken2(false)}
        onSelect={setToken2}
      />
    </SwapContainer>
  );
};

export default Liquidity; 