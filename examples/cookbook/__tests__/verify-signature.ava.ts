import { workspace } from './utils'
const moduleExample = require('../utils/verify-signature')
const {keyStores, verifySignature} = moduleExample

//note: any ideas on negative test here?

workspace.test('verify signature', async (test, { alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);
    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    test.truthy(await verifySignature(alice.accountId))
    //now with wrong account_id
    test.truthy(await verifySignature(alice.accountId + randomData));
})