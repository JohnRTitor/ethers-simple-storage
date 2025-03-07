import {
  ethers,
  JsonRpcProvider,
  Wallet,
  ContractFactory,
  BaseContract,
} from "ethers";
import { Provider } from "ganache";
import * as fs from "node:fs";
// import required modules

async function main(): Promise<void> {
  /*
  / We need two things to make a basic connection to the blockchain
  / RPC_URL: The URL of the blockchain node we want to connect to, like "http://127.0.0.1:8545"
  / PRIVATE_KEY: The private key of the account we want to use to deploy the contract
  / We can get both of these from Ganache or Hardhat
  / For security reasons, we should not hardcode the private key in the code
  / Set RPC_URL and PRIVATE_KEY in an envrc which only you have access to (`chmod 600 .envrc`)
  / Reload the shell before typing `ts-node deploy.ts` by `source .envrc`
  */

  // check if the environment variables are set
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing environment variables: RPC_URL or PRIVATE_KEY");
  }

  // DOCS: https://docs.ethers.org/v6/api/providers/jsonrpc/#about-jsonrpcProvider
  const provider: JsonRpcProvider = new JsonRpcProvider(process.env.RPC_URL!);
  // Create a wallet instance
  const wallet: Wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

  // To access our contract, we need to read the contract's
  // ABI, and Binary files synchronously
  const abi: string = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.abi",
    "utf8",
  );
  const binary: string = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  );

  // In Ethers contractFactory is a class to deploy the contract
  const contractFactory: ContractFactory = new ContractFactory(
    abi,
    binary,
    wallet,
  );

  // Wait for contract to be deployed
  console.log("Deploying, please wait...");
  const contract: BaseContract = await contractFactory.deploy();
  await contract.waitForDeployment();

  // call our retrieve() function in the SimpleStorage contract
  // DOCS: https://docs.ethers.org/v6/api/contract/#BaseContract-getFunction
  let currentFavoriteNumber: number = await contract.getFunction("retrieve")();
  console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
}

// Since main function is an async function
// which needs `then`, `catch` when calling
main()
  .then(() => {
    // on successful execution we exit the process with 0
    console.log("Deployment completed");
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error("Error:", error);
    process.exit(1);
  });
