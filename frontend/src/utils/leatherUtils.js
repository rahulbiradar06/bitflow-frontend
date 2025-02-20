export const connectLeatherWallet = async () => {
  try {
    // Check if Leather wallet is installed
    if (typeof window.StacksProvider === 'undefined') {
      throw new Error('Leather Wallet not installed');
    }

    // Get the wallet instance
    const wallet = window.StacksProvider;

    // Check if already connected
    try {
      const accounts = await wallet.getAddresses();
      if (accounts && accounts.length > 0) {
        return accounts[0];
      }
    } catch (e) {
      // Not connected yet, continue with connection request
    }

    // Request connection
    const accounts = await wallet.connect({
      userSession: true,
      network: 'mainnet',
      appDetails: {
        name: 'Bitflow',
        icon: window.location.origin + '/favicon.ico',
      }
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No address received from Leather wallet');
    }

    return accounts[0];

  } catch (error) {
    console.error('Error connecting to Leather wallet:', error);
    throw error;
  }
};

export const signLeatherTransaction = async (psbtHex) => {
  try {
    if (typeof window.StacksProvider === 'undefined') {
      throw new Error('Leather Wallet not installed');
    }

    const wallet = window.StacksProvider;

    // For Stacks transactions
    const signedTx = await wallet.signTransaction({
      network: 'mainnet',
      transaction: psbtHex,
    });

    return signedTx;
  } catch (error) {
    console.error('Error signing with Leather:', error);
    throw error;
  }
};

// Helper function to check if Leather is connected
export const isLeatherConnected = async () => {
  try {
    if (typeof window.StacksProvider === 'undefined') {
      return false;
    }
    const wallet = window.StacksProvider;
    const accounts = await wallet.getAddresses();
    return accounts && accounts.length > 0;
  } catch {
    return false;
  }
}; 