import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  console.log("Deploying ImpactPassport...");
  const passport = await ethers.deployContract("ImpactPassport");
  await passport.waitForDeployment();

  console.log("");
  console.log("=====================================");
  console.log("CONTRACT_ADDRESS=" + (await passport.getAddress()));
  console.log("=====================================");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
