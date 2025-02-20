import { getAddress, signTransaction as signTx } from 'sats-connect';

export const connectXverseWallet = async () => {
  try {
    const getAddressOptions = {
      payload: {
        purposes: ['payment'],
        message: 'Address for receiving payments',
        network: {
          type: 'Mainnet'
        },
      },
      onFinish: (response) => {
        return response.addresses[0].address;
      },
      onCancel: () => {
        throw new Error('User canceled the request');
      },
    };

    const address = await getAddress(getAddressOptions);
    return address;
  } catch (error) {
    console.error('Error connecting to Xverse wallet:', error);
    throw error;
  }
};

export const signXverseTransaction = async (psbtHex) => {
  try {
    const signPsbtOptions = {
      payload: {
        network: {
          type: 'Mainnet'
        },
        message: 'Sign Transaction',
        psbtHex: psbtHex,
      },
      onFinish: (response) => {
        return response.psbtHex;
      },
      onCancel: () => {
        throw new Error('User canceled the signing request');
      },
    };

    const signedPsbtHex = await signTx(signPsbtOptions);
    return signedPsbtHex;
  } catch (error) {
    console.error('Error signing transaction with Xverse:', error);
    throw error;
  }
};