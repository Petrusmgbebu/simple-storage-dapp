import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  console.log("Deploying SimpleStorage...");
  const storage = await ethers.deployContract("SimpleStorage");
  await storage.waitForDeployment();

  const address = await storage.getAddress();
  console.log("");
  console.log("=====================================");
  console.log("CONTRACT_ADDRESS=" + address);
  console.log("=====================================");
  console.log("");
  console.log("Copy the address above into frontend/index.html");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
