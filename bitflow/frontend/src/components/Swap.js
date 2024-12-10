import React, { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import TokenSelectModal from "./TokenSelectModal";
import { getTokenPrice } from "../utils/priceFeed";
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
  SwitchButton
} from "../styles/SwapStyles";

const ConversionRate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  padding: 12px;
  text-align: left;
`;

const Swap = () => {
  const { walletAddress, connected, signTransaction } = useWallet();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState({ symbol: "BTC", name: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", coingeckoId: 'bitcoin' });
  const [toToken, setToToken] = useState({ symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", coingeckoId: 'ethereum' });
  const [isSelectingFrom, setIsSelectingFrom] = useState(false);
  const [isSelectingTo, setIsSelectingTo] = useState(false);
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const updatePrices = async () => {
      const fromPrice = await getTokenPrice(fromToken.coingeckoId);
      const toPrice = await getTokenPrice(toToken.coingeckoId);
      
      if (fromPrice && toPrice) {
        const rate = fromPrice / toPrice;
        setConversionRate(rate);
        
        // Update toAmount if fromAmount exists
        if (fromAmount) {
          setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
        }
      }
    };

    updatePrices();
  }, [fromToken, toToken]);

  const calculateToAmount = (fromAmt) => {
    if (!conversionRate || !fromAmt) {
      return "";
    }
    return (parseFloat(fromAmt) * conversionRate).toFixed(6);
  };

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const formatRate = (rate) => {
    if (!rate) return "Loading...";
    return `1 ${fromToken.symbol} = ${rate.toFixed(6)} ${toToken.symbol}`;
  };

  const handleSwap = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const unsignedTx = ""; // Get this from your backend
      const signedTx = await signTransaction(unsignedTx);
      console.log("Signed Transaction:", signedTx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      <SwapContainer>
        <SwapHeader>
          <SwapTitle>Swap</SwapTitle>
        </SwapHeader>

        <TokenInput>
          <InputRow>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={handleFromAmountChange}
            />
            <TokenSelect onClick={() => setIsSelectingFrom(true)}>
              <TokenLogo as="img" src={fromToken.logo} />
              {fromToken.symbol}
              ▼
            </TokenSelect>
          </InputRow>
        </TokenInput>

        <SwitchButton onClick={handleSwitch}>
          ↓
        </SwitchButton>

        <TokenInput>
          <InputRow>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
            />
            <TokenSelect onClick={() => setIsSelectingTo(true)}>
              <TokenLogo as="img" src={toToken.logo} />
              {toToken.symbol}
              ▼
            </TokenSelect>
          </InputRow>
        </TokenInput>

        <ConversionRate>
          {formatRate(conversionRate)}
        </ConversionRate>

        <SwapButton
          disabled={!connected || !fromAmount}
          onClick={handleSwap}
        >
          {!connected 
            ? "Connect Wallet" 
            : !fromAmount 
              ? "Enter an amount" 
              : "Swap"}
        </SwapButton>
      </SwapContainer>

      <TokenSelectModal
        isOpen={isSelectingFrom}
        onClose={() => setIsSelectingFrom(false)}
        onSelect={setFromToken}
        selectedToken={toToken}
        otherToken={toToken}
      />

      <TokenSelectModal
        isOpen={isSelectingTo}
        onClose={() => setIsSelectingTo(false)}
        onSelect={setToToken}
        selectedToken={fromToken}
        otherToken={fromToken}
      />
    </>
  );
};

export default Swap;