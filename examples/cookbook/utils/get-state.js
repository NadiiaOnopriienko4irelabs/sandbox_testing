// demonstrates how to query the state without setting 
// up an account. (View methods only)
const { providers } = require("near-api-js");
//network config (replace testnet with mainnet or betanet)
exports.provider = new providers.JsonRpcProvider(
  "https://rpc.testnet.near.org"
);

async function getState(account_id, method_name, args_base64) {
    try {
  const view_query = {
    request_type: "call_function",
    account_id: account_id || "guest-book.testnet",
    method_name: method_name || "getMessages",
    args_base64: args_base64 || "e30=", //"{}"
    finality: "optimistic",
  };

  // console.log(view_query)

    const rawResult = await exports.provider.query(view_query)
        const result = JSON.parse(Buffer.from(rawResult.result).toString());
        return { result, logs: rawResult.result };
        // return { status: 'success', result: rawResult };
    } catch(e){
        return { status: 'failed', message: e.message };
  }
}

// getState();

exports.getState = getState;