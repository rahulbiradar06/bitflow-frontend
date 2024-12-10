import { getAddress, signTransaction as signTx } from 'sats-connect';

export const connectXverseWallet = async () => {
  try {
    return new Promise((resolve, reject) => {
      const getAddressOptions = {
        payload: {
          purposes: ['payment'],
          message: 'Address for receiving payments',
          network: {
            type: 'Mainnet'
          },
        },
        onFinish: (response) => {
          console.log("Xverse Wallet Address:", response);
          if (response && response.addresses && response.addresses[0]) {
            resolve(response.addresses[0].address);
          } else {
            reject(new Error("No address received from wallet"));
          }
        },
        onCancel: () => {
          reject(new Error("User cancelled the request"));
        },
      };

      getAddress(getAddressOptions);
    });
  } catch (error) {
    console.error("Error connecting to Xverse Wallet:", error);
    throw error;
  }
};

export const signTransaction = async (unsignedTxHex) => {
  try {
    const signPsbtOptions = {
      payload: {
        network: {
          type: 'Mainnet'
        },
        message: 'Sign Transaction',
        psbtHex: unsignedTxHex,
      },
      onFinish: (response) => {
        console.log("Signed Transaction:", response);
        return response;
      },
      onCancel: () => {
        throw new Error("User cancelled the signing request");
      },
    };

    const signedTx = await signTx(signPsbtOptions);
    return signedTx;
  } catch (error) {
    console.error("Error signing transaction:", error);
    throw error;
  }
};