import { ethers } from "ethers";

// TODO: rename to createMessageToSign
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rawMessageToSignedMessage = (rawMessage: string) => {
  //const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawMessage));
  //return `\x19Ethereum Signed Message:\n${32}\n${hash}`;
  return `
Hey, thanks for using dookey.renft.io! We appreciate you!

Please sign this message to request a Sewer Pass to be delegated to you.
  `.trim();
};

export const verifySignature = ({
  signerAddress,
  rawMessage,
  signature,
}: {
  signerAddress: string;
  rawMessage: string;
  signature: string;
}): boolean => {
  const signedMessage = rawMessageToSignedMessage(rawMessage);

  const actualAddress = ethers.utils.verifyMessage(signedMessage, signature);

  return signerAddress === actualAddress;
};
