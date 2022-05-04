import { workspace } from './utils'
import {keyStores } from 'near-api-js'

workspace.test('delete access key', async (test, { root, alice, status_message }) => {
    const config = alice["manager"]["config"];

    const module = require('../accounts/access-keys/delete-access-key')
    // "ed25519:4yLYjwC3Rd8EkhKwVPoAdy6EUcCVSz2ZixFtsCeuBEZD";
    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());
    const publicKey = await alice.getKey()
    module.config.keyStore = ks
    module.config.networkId = 'sandbox'
    module.config.nodeUrl = config.rpcAddr;
    const {deleteAccessKey} = module
    test.truthy(await deleteAccessKey(alice.accountId, publicKey.getPublicKey()))
    // now with wrong account id
    test.truthy(await deleteAccessKey(alice.accountId + 'a', publicKey.getPublicKey()));
    // now with wrong public key
    test.truthy(await deleteAccessKey(alice.accountId, publicKey.getPublicKey() +'2'));


})