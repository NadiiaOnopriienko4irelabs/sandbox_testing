const { keyStores, connect } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

async function deployContract(account_id, wasmPath) {
    try {
        const near = await connect(exports.config);
        const account = await near.account(account_id);

        const result = await account.deployContract(fs.readFileSync(wasmPath));
        return {result, message: 'Contract deployed successfully'}
    } catch (e) {
        return { status: 'failed', message: e.message };
    }

}

exports.deployContract = deployContract;
exports.keyStores = keyStores;