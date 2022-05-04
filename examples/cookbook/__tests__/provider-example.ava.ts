import { workspace } from './utils'
import { providers } from '../../../lib'

workspace.test('check provider example', async (test, { root, alice })=>{
    const config = workspace["container"]["config"];

    const module = require('../api-keys/provider-example')
    module.provider = new providers.JsonRpcProvider(config.rpcAddr);
    const { getNetworkStatus} = module
    test.truthy(await getNetworkStatus())
})