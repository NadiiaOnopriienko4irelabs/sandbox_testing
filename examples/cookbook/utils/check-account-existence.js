const { providers } = require("near-api-js");

exports.provider = new providers.JsonRpcProvider(
    "https://archival-rpc.testnet.near.org"
);

async function accountExists(account_id) {
    let rawResult;

    let succeeded = true;
    try {
        rawResult = await exports.provider.query({
            request_type: "view_account",
            account_id: account_id,
            finality: "final",
        });
    } catch (e) {
        if (e.type === 'AccountDoesNotExist') {
            succeeded = false;
        }
    }
    return succeeded;
}



exports.accountExists = accountExists;
