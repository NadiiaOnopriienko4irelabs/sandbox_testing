import { workspace } from './utils'
import { providers} from 'near-api-js'
import moduleExample from "../transactions/get-tx-status";
const {getStatusTransaction} = moduleExample

workspace.test('get transaction status', async (test, { alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    moduleExample.provider = new providers.JsonRpcProvider(config.rpcAddr);
    const transaction = await alice.transfer(alice.accountId, '0.01')

    test.truthy(await getStatusTransaction(transaction.result.transaction.hash, alice.accountId))
    // now with wrong account id
    test.truthy(await getStatusTransaction(transaction.result.transaction.hash ,alice.accountId + randomData));
    // now with wrong hash
    test.truthy(await getStatusTransaction(transaction.result.transaction.hash + randomData ,alice.accountId));
})