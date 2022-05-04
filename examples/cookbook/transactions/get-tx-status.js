// demonstrates how to get a transaction status
const { providers } = require("near-api-js");

//network config (replace testnet with mainnet or betanet)
exports.provider = new providers.JsonRpcProvider(
    "https://archival-rpc.testnet.near.org"
);

const TX_HASH = "9av2U6cova7LZPA9NPij6CTUrpBbgPG6LKVkyhcCqtk3";
// account ID associated with the transaction
const ACCOUNT_ID = "sender.testnet";

// getStatusTransaction(TX_HASH, ACCOUNT_ID);

async function getStatusTransaction(txHash, accountId) {
    try {
        const result = await exports.provider.txStatus(txHash, accountId);
        return { status: 'success', result };
    } catch (e) {
        return { status: 'failed', message: e.message };
    }
}

exports.getStatusTransaction = getStatusTransaction
