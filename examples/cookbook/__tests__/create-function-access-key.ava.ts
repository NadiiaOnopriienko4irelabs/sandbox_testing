import { workspace } from './utils'
import {keyStores } from 'near-api-js'


workspace.test('create function access key', async (test, { root, alice, status_message }) => {
    const config = alice["manager"]["config"];

    const module = require('../accounts/access-keys/create-function-access-key')

    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.config.keyStore = ks
    module.config.networkId = 'sandbox'
    module.config.nodeUrl = config.rpcAddr;
    const {addFunctionAccessKey} = module
    test.truthy(await addFunctionAccessKey(alice.accountId))
    test.truthy(await addFunctionAccessKey(alice.accountId + 'a'));
})