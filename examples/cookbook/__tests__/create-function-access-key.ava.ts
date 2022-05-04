import { workspace } from './utils'
const moduleExample = require('../accounts/access-keys/create-function-access-key')
const {keyStores, addFunctionAccessKey} = moduleExample


workspace.test('create function access key', async (test, {  alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    test.truthy(await addFunctionAccessKey(alice.accountId))
    test.truthy(await addFunctionAccessKey(alice.accountId + randomData));
})