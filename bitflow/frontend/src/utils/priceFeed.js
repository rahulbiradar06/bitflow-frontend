const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export const getTokenPrice = async (tokenId) => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${tokenId}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[tokenId]?.usd || 0;
  } catch (error) {
    console.error('Error fetching price:', error);
    return 0;
  }
};

export const tokens = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    coingeckoId: 'bitcoin'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    coingeckoId: 'ethereum'
  },
  { 
    symbol: 'USDT', 
    name: 'Tether', 
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    coingeckoId: 'tether'
  },
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    coingeckoId: 'usd-coin'
  }
]; 