// demonstrates how to use API-KEY with provider 
const { providers } = require("near-api-js");

// const RPC_API_ENDPOINT = '<Replace this string with your RPC server URL>';
 const API_KEY = '<Replace this string with your API KEY>';

exports.provider = new providers.JsonRpcProvider({
    url: "https://rpc.testnet.near.org",
    headers: { 'x-api-key': API_KEY },
});

// getNetworkStatus();

async function getNetworkStatus() {
    try {
        const result = await exports.provider.status();
        return { status: 'success', result: result };
    } catch (error) {
        return { status: 'failed', message: error.message };
    }
}

exports.getNetworkStatus = getNetworkStatus
