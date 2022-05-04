import { workspace } from './utils'
import {keyStores, providers, transactions} from 'near-api-js'
import module from "../transactions/get-tx-status";



workspace.test('get transaction status', async (test, { root, alice, linkdrop }) => {
    const config = alice["manager"]["config"];

    const module = require('../transactions/get-tx-status')
    const {getStatusTransaction} = module
    // let ks = new keyStores.InMemoryKeyStore();
    // await ks.setKey('sandbox', alice.accountId, await alice.getKey());
    module.provider = new providers.JsonRpcProvider(config.rpcAddr);
    const transaction = await alice.transfer(alice.accountId, '0.01')

    test.truthy(await getStatusTransaction(transaction.result.transaction.hash, alice.accountId))
    // now with wrong account id
    test.truthy(await getStatusTransaction(transaction.result.transaction.hash ,alice.accountId + 'a'));
    // now with wrong hash
    test.truthy(await getStatusTransaction(transaction.result.transaction.hash+ '1',alice.accountId));


})