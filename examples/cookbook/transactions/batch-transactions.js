const { connect, transactions, keyStores } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// NOTE: replace "example" with your accountId
const CONTRACT_NAME = "example.testnet";
const WHITELIST_ACCOUNT_ID = "example.testnet";
const WASM_PATH = path.join(__dirname, "../utils/wasm-files/staking_pool_factory.wasm");

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};


// sendTransactions();

async function sendTransactions(contractName, whiteList_accountId) {
    try {
    const near = await connect(exports.config);
    const account = await near.account(contractName);
    const newArgs = { staking_pool_whitelist_account_id: whiteList_accountId};
    const result = await account.signAndSendTransaction({
        receiverId: contractName,
        actions: [
            transactions.deployContract(fs.readFileSync(WASM_PATH)),
            transactions.functionCall(
                "new",
                Buffer.from(JSON.stringify(newArgs)),
                10000000000000,
                "0"
            ),
        ],
    });
        return { status: 'success', result };
    } catch (e) {
        return { status: 'failed', message: e.message };
    }
}

exports.sendTransactions = sendTransactions
exports.keyStores = keyStores