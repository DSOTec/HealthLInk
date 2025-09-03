import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy MockStablecoin first
  const MockStablecoin = await hre.ethers.getContractFactory("MockStablecoin");
  const mockStablecoin = await MockStablecoin.deploy(
    "HealthLink USD", // name
    "HLUSD",         // symbol
    6,               // decimals (like USDC)
    1000000          // initial supply (1M tokens)
  );

  await mockStablecoin.waitForDeployment();
  const mockStablecoinAddress = await mockStablecoin.getAddress();
  console.log("MockStablecoin deployed to:", mockStablecoinAddress);

  // Deploy HealthLink contract
  const HealthLink = await hre.ethers.getContractFactory("HealthLink");
  const healthLink = await HealthLink.deploy(mockStablecoinAddress);

  await healthLink.waitForDeployment();
  const healthLinkAddress = await healthLink.getAddress();
  console.log("HealthLink deployed to:", healthLinkAddress);

  // Mint some tokens to deployer for testing
  await mockStablecoin.mint(deployer.address, hre.ethers.parseUnits("10000", 6));
  console.log("Minted 10,000 HLUSD to deployer for testing");

  console.log("\n=== Deployment Summary ===");
  console.log("MockStablecoin:", mockStablecoinAddress);
  console.log("HealthLink:", healthLinkAddress);
  console.log("Deployer:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
