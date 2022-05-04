import { workspace } from './utils'
import module from "../api-keys/near-connection";


workspace.test('create full access key', async (test, { root, alice, status_message }) => {
    const config = status_message["manager"]["config"];


    const module = require('../accounts/access-keys/create-full-access-key')
     const keyStores = module.keyStores;
    const {  createFullAccessKey } = module
    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.config.keyStore = ks
    module.config.networkId = 'sandbox'
    module.config.nodeUrl = config.rpcAddr;

    let result = await createFullAccessKey(alice.accountId);
    test.truthy(result)

    // now with wrong account id
    let result2 = await createFullAccessKey(alice.accountId + 'a');
    test.truthy(result2)
});