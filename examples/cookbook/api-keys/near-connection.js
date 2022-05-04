// demonstrates how to use API-KEY with 'connect' function. 
const { connect, keyStores } = require("near-api-js");
const path = require("path");

const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

 const API_KEY = '<Replace this string with your API KEY>';


exports.config = {
    keyStore,
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    headers: { 'x-api-key': API_KEY },
};

async function getState(accountId) {
    try {
        const near = await connect(exports.config);
        const account = await near.account(accountId);
        const state = await account.state();
        // console.log(state);
        return { status: 'success', result: state };
    } catch (e) {
        return { status: 'failed', message: e.message };
    }
}

// getState('nadiiea.testnet');

exports.getState = getState
exports.keyStores = keyStores;