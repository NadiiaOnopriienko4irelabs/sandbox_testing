import { workspace } from './utils'
import { providers} from 'near-api-js'
const moduleExample = require('../transactions/get-tx-detail')
const {keyStores, getTransactions} = moduleExample

workspace.test('get transaction status', async (test, { alice }) => {
    const config = alice["manager"]["config"];

    const keyStore = new keyStores.InMemoryKeyStore();

    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.provider = new providers.JsonRpcProvider(config.rpcAddr);

    // const transaction = await alice.transfer(alice.accountId, '0.01')
    // const transaction2 = await alice.transfer(alice.accountId, '0.01')
    // console.log(transaction)

    // const end_hash = transaction.result.transaction_outcome.block_hash
    // console.log('end hash')
    // console.log(end_hash)

    // const start_hash = transaction.result.
    // const start_hash = transaction.result.transaction.hash
    // console.log('start hash')
    // console.log(start_hash)
    // const res = await getTransactions(start_hash, end_hash, alice.accountId)
    // console.log(res)
    // test.truthy(await getTransactions(start_hash, end_hash, alice.accountId))
    // now with wrong account id
    // test.truthy(await getTransactions(transaction.result.transaction.hash ,alice.accountId + 'a'));
    // // now with wrong hash
    // test.truthy(await getTransactions(transaction.result.transaction.hash+ '1',alice.accountId));
})