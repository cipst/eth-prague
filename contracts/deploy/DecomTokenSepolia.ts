import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'DecomToken'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    const sepoliaLzEndpoint = '0x6EDCE65403992e310A62460808c4b910D972f10f';    
    const assetInSepoliaAddress = '0x115dbe28b5d2ad694306ca194d984504654ff8da';

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            sepoliaLzEndpoint, // lzEndpoint
            deployer, // delegate
            assetInSepoliaAddress // asset
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
