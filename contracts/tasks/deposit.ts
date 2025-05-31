import { EndpointId } from "@layerzerolabs/lz-definitions";
import { task, types } from "hardhat/config";

interface Args {
  tokenERC20: string,
  toEid: EndpointId
}

task('deposit', 'Deposit asset into vault')
  .addParam('tokenERC20', '', undefined, types.string)
  .setAction(async (taskArgs: Args, {ethers, deployments}) => {
    const vaultDeployment = await deployments.get('DecomToken');
    const token = await ethers.getContractAt('MyAsset', taskArgs.tokenERC20);
    
    const [signer] = await ethers.getSigners();

    const vaultContract = new ethers.Contract(
      vaultDeployment.address, 
      vaultDeployment.abi, 
      signer
    );

    const decimals = await token.decimals();
    const amount = ethers.utils.parseUnits('10', decimals);

    let trx = await token.approve(vaultContract.address, amount);
    

    let receipt = await trx.wait();
    console.log(`Vault contract approved`);
    trx = await vaultContract.connect(signer).deposit(amount);
    receipt = await trx.wait();

    console.log(receipt);
  })