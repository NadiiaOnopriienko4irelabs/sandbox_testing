import { workspace } from './utils'
import { providers} from 'near-api-js'

workspace.test('get transaction status', async (test, { root, alice, linkdrop }) => {
    const config = alice["manager"]["config"];

    const module = require('../transactions/get-tx-detail')
    const {keyStores, getTransactions} = module
    let ks = new keyStores.InMemoryKeyStore();

    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.provider = new providers.JsonRpcProvider(config.rpcAddr);

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