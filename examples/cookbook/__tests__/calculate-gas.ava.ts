import { workspace } from './utils'
const moduleExample = require('../utils/calculate-gas.js')
const { calculateGas, keyStores  } = moduleExample

workspace.test('calculate gas', async (test, { alice, status_message })=>{
    const config = status_message["manager"]["config"];

    const CONTRACT_ID = status_message.accountId;
    const METHOD_NAME = 'set_status';
    const ATTACHED_DEPOSIT = "0";
    const args = {
        message: "Working on tests for near-api-js...",
    };

    const keyStore = new keyStores.InMemoryKeyStore()
    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());

    moduleExample.ACCOUNT_ID = alice.accountId;
    moduleExample.config.keyStore = keyStore
    moduleExample.config.networkId = 'sandbox'
    moduleExample.config.nodeUrl = config.rpcAddr

    const result = await calculateGas(CONTRACT_ID, METHOD_NAME, args, ATTACHED_DEPOSIT);
    test.true(result.tokens.totalTokensBurned > 0.0)
    test.true(result.tokens.totalGasBurned > 1)
})