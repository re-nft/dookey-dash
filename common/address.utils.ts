import { ethers } from "ethers";

export const compareAddresses = (a: unknown, b: unknown): boolean => {
  if (typeof a !== "string" || typeof b !== "string") return false;

  if (!ethers.utils.isAddress(a) || !ethers.utils.isAddress(b)) return false;

  return ethers.utils.getAddress(a) === ethers.utils.getAddress(b);
};
