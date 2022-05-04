import { workspace } from './utils'
const moduleExample = require('../api-keys/near-connection')
const { keyStores, getState } = moduleExample

workspace.test('naer conection', async (test, { alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.config.headers = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    test.truthy(await getState(alice.accountId));
    // now with wrong account id
    test.truthy(await getState(alice.accountId + randomData));
});