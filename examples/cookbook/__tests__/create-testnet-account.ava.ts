import { workspace } from './utils'

workspace.test('create testnet account', async (test, { root, alice, linkdrop }) => {
    const config = linkdrop["manager"]["config"];

    const module = require('../accounts/create-testnet-account')
    module.config.networkId = "sandbox";
    module.config.nodeUrl = config.rpcAddr;
    let root_account_id = "linkdrop." + root.accountId;

    module.root = root_account_id;
    const { keyStores, createAccount } = module

    let ks = new keyStores.InMemoryKeyStore();
    await ks.setKey('sandbox', alice.accountId, await alice.getKey());

    module.config.keyStore = ks;

    const new_account_id ="subaccount.";//alice.near will be appended automaticly
    let res = await createAccount(alice.accountId, new_account_id + root_account_id, "0.25");//Minimum balance required
    // console.log(res)
    test.truthy(res)

    // now with wrong account id

    let wrong_account_id = await  createAccount(
        alice.accountId + 'a',
        "newAccount",
        "0.25");
    test.truthy(wrong_account_id)

    // now with wrong account already exists


    let already_exists = await  createAccount(
        alice.accountId ,
        'newaccount.testnet',
        "0.25");
    // console.log(already_exists)
    test.truthy(already_exists)
    // console.log('------ end func')
})