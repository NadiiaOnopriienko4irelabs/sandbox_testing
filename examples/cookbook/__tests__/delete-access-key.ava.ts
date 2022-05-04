import { workspace } from './utils'
const moduleExample = require('../accounts/access-keys/delete-access-key')
const {keyStores, deleteAccessKey} = moduleExample

workspace.test('delete access key', async (test, {  alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());
    const publicKey = await alice.getKey()

    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    test.truthy(await deleteAccessKey(alice.accountId, publicKey.getPublicKey()))
    // now with wrong account id
    test.truthy(await deleteAccessKey(alice.accountId + randomData, publicKey.getPublicKey()));
    // now with wrong public key
    test.truthy(await deleteAccessKey(alice.accountId, publicKey.getPublicKey() + randomData.toString()));


})