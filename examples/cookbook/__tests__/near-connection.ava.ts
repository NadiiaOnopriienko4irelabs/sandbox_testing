import { workspace } from './utils'
import module from "../api-keys/near-connection";


workspace.test('naer conection', async (test, { root, alice, status_message }) => {
    const config = alice["manager"]["config"];

    const module = require('../api-keys/near-connection')
    // const keyStores = module.keyStores;
    const { keyStores, getState } = module
    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.config.headers = ks
    module.config.networkId = 'sandbox'
    module.config.nodeUrl = config.rpcAddr;

    let result = await getState(alice.accountId);
    test.truthy(result)

    // now with wrong account id
    let result2 = await getState(alice.accountId + 'a');
    test.truthy(result2)
});