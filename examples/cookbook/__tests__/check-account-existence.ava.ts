import { workspace } from './utils'
import { providers} from 'near-api-js'
import moduleExample from "../utils/check-account-existence";
const { accountExists} = moduleExample

workspace.test('check account existence', async (test, { root, alice })=>{
    const config = workspace["container"]["config"];

    moduleExample.provider = new providers.JsonRpcProvider(config.rpcAddr);

    test.log("check if  account no exists")
    test.false(await accountExists("nonexistentaccount.testnet"))
    test.log("check if root account exists")
    test.true(await accountExists(root.accountId))
    test.log("check if alice account exists")
    test.true(await accountExists(alice.accountId))
})