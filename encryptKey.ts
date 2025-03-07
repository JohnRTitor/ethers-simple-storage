import {
  ethers,
  JsonRpcProvider,
  Wallet,
  ContractFactory,
  BaseContract,
} from "ethers";
import * as fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
  const wallet: Wallet = new Wallet(process.env.PRIVATE_KEY!);
  // pending implementation
  const encryptedJsonKey = await wallet.encrypt();
}

main()
  .then(() => {
    console.log("Encryption key generated successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
