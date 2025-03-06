import { ethers, JsonRpcProvider } from "ethers";
import { Provider } from "ganache";
import * as fs from "node:fs";
// import required modules

async function main(): Promise<void> {
  // Get this from Ganache
  // RPC URL: http://127.0.0.1:8545
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  // Create a wallet instance
  // We need the private key to sign transactions
  // Get it from Ganache
  // DO NOT REVEAL YOUR PRIVATE KEY OR COMMIT IT TO A PUBLIC REPO
  // Set it in an envrc which only you have access to `chmod 600 .envrc`
  const wallet = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY!, provider);
  // These ^^ two lines are needed to connect to Blockchain

  // To access our contract, or rather contract's ABI and Binary
  // We need to access the filesystem so we need the fs-extra module
  // We should read the files synchronusly
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  );

  // In Ethers contractFactory is an object to deploy the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  // Wait for contract to be deployed
  const contract = await contractFactory.deploy();
  const deploymentTx = contract.deploymentTransaction();

  if (!deploymentTx) {
    throw new Error("Deployment transaction not found");
  }

  // // specify the number of block to wait for, here we wait for 1 block
  const deploymentReceipt = await deploymentTx.wait(1);
  console.log("Contract deployed at:", contract.target);
  // Transaction response is what we get initially
  console.log("Here is the deployment transaction response: ");
  console.log(deploymentTx);
  // if we wait for a block, we get a reciept
  console.log("Here is the deployment reciept: ");
  console.log(deploymentReceipt);
}

// Since main function is an async function
// we need then, catch
main()
  // on successful execution we exit the process with 0
  .then(() => {
    console.log("Deployment completed");
    process.exit(0);
  })
  // on error we exit the process with 1
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
