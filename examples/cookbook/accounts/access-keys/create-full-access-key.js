const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// const ACCOUNT_ID = "nadiia.testnet";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

 // createFullAccessKey(ACCOUNT_ID);
exports.root = 'testnet'
async function createFullAccessKey(accountId) {
    try {
        const keyPair = KeyPair.fromRandom('ed25519');
        const publicKey = keyPair.publicKey.toString();
        const near = await connect(exports.config);
        const account = await near.account(accountId);

        await keyStore.setKey(exports.config.networkId, publicKey, keyPair);
       const addKey =  await account.addKey(publicKey);
            return { status: 'success', message: `Access key, for account id - ${accountId}, created successfully`, result: addKey };
    } catch (e) {
        return { status: 'failed', message: e.message };
    }
}

exports.createFullAccessKey = createFullAccessKey;
exports.keyStores = keyStores;