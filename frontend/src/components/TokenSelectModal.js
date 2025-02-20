import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTokenPrice, tokens } from '../utils/priceFeed';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgb(13, 17, 28);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 420px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  margin-bottom: 16px;
  outline: none;

  &:focus {
    border-color: rgb(76, 130, 251);
  }
`;

const TokenList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const TokenItem = styled.button`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const TokenLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
`;

const TokenInfo = styled.div`
  text-align: left;
`;

const TokenName = styled.div`
  font-weight: 500;
`;

const TokenSymbol = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const TokenPrice = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-left: auto;
  padding-left: 12px;
`;

const TokenBalance = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const TokenRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ConversionInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: auto;
`;

const TokenSelectModal = ({ isOpen, onClose, onSelect, selectedToken, otherToken }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tokenPrices, setTokenPrices] = useState({});
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = {};
      for (const token of tokens) {
        prices[token.symbol] = await getTokenPrice(token.coingeckoId);
      }
      setTokenPrices(prices);
    };

    if (isOpen) {
      fetchPrices();
    }
  }, [isOpen]);

  const getConversionRate = (token) => {
    if (!otherToken || !tokenPrices[token.symbol] || !tokenPrices[otherToken.symbol]) {
      return null;
    }
    return tokenPrices[token.symbol] / tokenPrices[otherToken.symbol];
  };

  const formatConversion = (token) => {
    const rate = getConversionRate(token);
    if (!rate) return '';
    return `1 ${token.symbol} = ${rate.toFixed(6)} ${otherToken.symbol}`;
  };

  useEffect(() => {
    const filtered = tokens.filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchQuery]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Select a token</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <SearchInput 
          placeholder="Search name or paste address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />

        <TokenList>
          {filteredTokens.map(token => (
            <TokenItem
              key={token.symbol}
              onClick={() => {
                onSelect({
                  ...token,
                  price: tokenPrices[token.symbol]
                });
                onClose();
              }}
              disabled={token.symbol === selectedToken?.symbol}
            >
              <TokenRow>
                <TokenLogo src={token.logo} alt={token.name} />
                <TokenInfo>
                  <TokenName>{token.symbol}</TokenName>
                  <TokenSymbol>{token.name}</TokenSymbol>
                </TokenInfo>
                <ConversionInfo>
                  <TokenPrice>
                    {formatPrice(tokenPrices[token.symbol] || 0)}
                  </TokenPrice>
                  {otherToken && (
                    <div>{formatConversion(token)}</div>
                  )}
                </ConversionInfo>
              </TokenRow>
            </TokenItem>
          ))}
        </TokenList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TokenSelectModal; 