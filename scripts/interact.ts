import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  console.log("Deploying SimpleStorage...");
  const storage = await ethers.deployContract("SimpleStorage");
  await storage.waitForDeployment();

  console.log("Deployed at:", await storage.getAddress());
  console.log("Initial value:", (await storage.get()).toString());

  console.log("Setting value to 123...");
  const tx = await storage.set(123);
  await tx.wait();

  console.log("New value:", (await storage.get()).toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
