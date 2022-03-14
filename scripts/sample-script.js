// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Token ($RES)
  const ParcelContract = await hre.ethers.getContractFactory("Parcel");
  const parcelContract = await ParcelContract.deploy();

  await parcelContract.deployed();

  const maxX = 5; //5
  const maxY = 5; //5

  //mint une grille de maxX*maxY
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      const tx1 = await parcelContract.parcelMint(
        i,
        j,
        "Parcel " + i + "," + j
      );
      await tx1.wait();
    }
  }

  const [owner] = await hre.ethers.getSigners();

  console.log("parcel owner: " + (await owner.getAddress()));

  console.log("Copy paste the following in ./next_frontend/settings.ts: \n");

  console.log(
    `export const parcelContractAddress = "${
      parcelContract.address
    }" \nexport const itemsContractAddress = "${await parcelContract.itemGetContract()}" \nexport const resContractAddress = "${await parcelContract.rewardGetContract()}"\nexport const gridSize = [${maxX},${maxY}]`
  );

  //.....
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
