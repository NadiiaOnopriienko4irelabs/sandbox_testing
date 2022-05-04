import { workspace } from './utils'
const moduleExample = require('../utils/deploy-contract')
const {keyStores, deployContract } = moduleExample

workspace.test('deploy contract', async (test, { alice }) => {
    const config = alice["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr;

    test.truthy(
        await deployContract(alice.accountId, "__tests__/res/status_message.wasm"),
        'Contract deployed successfully'
    );
    // now with wrong account id
    test.truthy( await deployContract(
        alice.accountId + randomData,
        "__tests__/res/status_message.wasm"
    ));
});