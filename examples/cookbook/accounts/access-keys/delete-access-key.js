const { keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// NOTE: replace "example.testnet" with your accountId
// const ACCOUNT_ID = "example.testnet";
// NOTE: replace this PK with the one that you are trying to delete
// const PUBLIC_KEY = "ed25519:4yLYjwC3Rd8EkhKwVPoAdy6EUcCVSz2ZixFtsCeuBEZD";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

// deleteAccessKey(ACCOUNT_ID, PUBLIC_KEY);

async function deleteAccessKey(accountId, publicKey) {
    try {
    const near = await connect(exports.config);
    const account = await near.account(accountId);
   const result =  await account.deleteKey(publicKey);
        return { status: 'success', result, message: `Access key, for account id - ${accountId}, deleted successfully` };
    } catch (e) {
        return { status: 'failed', message: e.message };
    }
}

exports.deleteAccessKey = deleteAccessKey
exports.keyStores = keyStores
