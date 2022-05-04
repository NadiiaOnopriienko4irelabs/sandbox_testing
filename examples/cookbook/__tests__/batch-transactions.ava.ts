import { workspace } from './utils'

workspace.test('batch transactions', async (test, { root, alice, status_message }) => {
    const config = alice["manager"]["config"];
    const module = require('../transactions/batch-transactions')
    const {keyStores, sendTransactions} = module

    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.config.keyStore = ks
    module.config.networkId = 'sandbox'
    module.config.nodeUrl = config.rpcAddr;

    test.truthy(await sendTransactions(alice.accountId, alice.accountId))
    test.truthy(await sendTransactions(alice.accountId, alice.accountId + 'a'));
})