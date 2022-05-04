import { workspace } from './utils'
const moduleExample = require('../accounts/access-keys/create-full-access-key')
const {keyStores,  createFullAccessKey } = moduleExample;

workspace.test('create full access key', async (test, { root, alice, status_message }) => {
    const config = status_message["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    const trueResult = await createFullAccessKey(alice.accountId);
    test.truthy(trueResult)
    // now with wrong account id
    const falseResult = await createFullAccessKey(alice.accountId + randomData);
    test.truthy(falseResult)
});