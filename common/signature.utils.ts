import { ethers } from 'ethers';

const rawMessageToSignedMessage = (rawMessage: string) => {
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawMessage));
  return `\x19Ethereum Signed Message:\n${32}\n${hash}`;
}

export const verifySignature = async ({
    signerAddress,
    rawMessage,
    signature 
}:{
    signerAddress: string,
    rawMessage: string, 
    signature: string
}): Promise<boolean> => {
    const signedMessage = rawMessageToSignedMessage(rawMessage);
  
    const actualAddress = ethers.utils.verifyMessage(
      signedMessage,
      signature,
    );
  
    return signerAddress === actualAddress;
}