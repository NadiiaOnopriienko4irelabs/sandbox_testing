import { workspace } from './utils'
const moduleExample = require('../accounts/create-testnet-account')
const { keyStores, createAccount } = moduleExample

workspace.test('create testnet account', async (test, { root, alice, linkdrop }) => {
    const config = linkdrop["manager"]["config"];
    const randomData = Math.floor(Math.random() * (99999999999999 - 10000000000000) + 10000000000000);

    const root_account_id = "linkdrop." + root.accountId;
    const new_account_id ="subaccount.";//alice.near will be appended automaticly
    const keyStore = new keyStores.InMemoryKeyStore();

    await keyStore.setKey('sandbox', alice.accountId, await alice.getKey());
    moduleExample.config.networkId = "sandbox";
    moduleExample.config.nodeUrl = config.rpcAddr;
    moduleExample.config.keyStore = keyStore;
    moduleExample.root = root_account_id;

    const newAccount = await createAccount(alice.accountId, new_account_id + root_account_id, "0.25");//Minimum balance required
    test.truthy(newAccount)
    // now with wrong account id
    const wrong_account_id = await  createAccount(
        alice.accountId + randomData,
        "newAccount",
        "0.25");
    test.truthy(wrong_account_id)
    // now with wrong account already exists
    const already_exists = await  createAccount(
        alice.accountId ,
        'newaccount.testnet',
        "0.25");
    test.truthy(already_exists)
})