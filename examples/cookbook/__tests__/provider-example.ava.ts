import { workspace } from './utils'
import { providers } from '../../../lib'
import moduleExample from "../api-keys/provider-example";
const { getNetworkStatus} = moduleExample

workspace.test('check provider example', async (test)=>{
    const config = workspace["container"]["config"];

    moduleExample.provider = new providers.JsonRpcProvider(config.rpcAddr);
    test.truthy(await getNetworkStatus())
})