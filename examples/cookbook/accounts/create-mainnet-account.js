// const HELP = `Please run this script in the following format:
//
//   node create-mainnet-account.js CREATOR_ACCOUNT.near NEW_ACCOUNT.near AMOUNT"
// `;

const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config  = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
};
exports.root = 'mainnet';

// if (process.argv.length !== 5) {
//   console.info(HELP);
//   process.exit(1);
// }

// createAccount('nadiia.mainnet', 'qwerkasjflnv.mainnet', '1');

async function createAccount(creatorAccountId, newAccountId, amount) {
    try {
  const near = await connect(exports.config);
  const creatorAccount = await near.account(creatorAccountId);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(exports.config.networkId, newAccountId, keyPair);

        const newAccount = await creatorAccount.functionCall({
    contractId: exports.root,
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
        console.log('mainnet')
        console.log(newAccount)
    if (newAccount.status.SuccessValue === 'ZmFsc2U=') {
        throw {message: `Can't create a new account ${newAccountId}, because it already exists`};
    }
    return {
        status: 'success',
        message: `Account ${newAccountId}, created successfully`,
    };
} catch (e) {
    return {status: 'failed', message: e.message};
}
}

exports.keyStores = keyStores;
exports.createAccount = createAccount;



// const { connect, KeyPair, keyStores, utils } = require("near-api-js");
// const path = require("path");
// const homedir = require("os").homedir();
//
// const CREDENTIALS_DIR = ".near-credentials";
// const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
// const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
//
// exports.config = {
//     keyStore,
//     networkId: "mainnet",
//     nodeUrl: "https://rpc.mainnet.near.org",
// };

// if (process.argv.length !== 5) {
//     console.info(HELP);
//     process.exit(1);
// }

// createAccount('nadiia.mainnet', 'qwerkasjflnv.mainnet', '0.25');
//
//
// async function createAccount(creatorAccountId, newAccountId, amount) {
//     const near = await connect(exports.config);
//     const creatorAccount = await near.account(creatorAccountId);
//     const keyPair = KeyPair.fromRandom("ed25519");
//     const publicKey = keyPair.publicKey.toString();
//     await keyStore.setKey(exports.config.networkId, newAccountId, keyPair);
//
//     return await creatorAccount.functionCall({
//         contractId: "near",
//         methodName: "create_account",
//         args: {
//             new_account_id: newAccountId,
//             new_public_key: publicKey,
//         },
//         gas: "300000000000000",
//         attachedDeposit: utils.format.parseNearAmount(amount),
//     });
// }