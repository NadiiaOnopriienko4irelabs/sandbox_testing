// const HELP = `To convert N $NEAR to wNEAR,  run this script in the following format:
//
//     node wrap-near.js YOU.near N
//
// Note: runs on mainnet!`;

const { connect, keyStores, transactions, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const WRAP_NEAR_CONTRACT_ID = "wrap.near";

const credentialsPath = path.join(homedir, ".near-credentials");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

exports.config = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
};

// if (process.argv.length !== 4) {
//   console.info(HELP);
//   process.exit(1);
// }

// wrapNear(process.argv[2], process.argv[3]);

async function wrapNear(accountId, wrapAmount) {
    try {
        const near = await connect(exports.config);
        const account = await near.account(accountId);

        exports.actions = [
            transactions.functionCall(
                "near_deposit", // contract method to deposit NEAR for wNEAR
                {},
                30000000000000, // attached gas
                utils.format.parseNearAmount(wrapAmount) // amount of NEAR to deposit and wrap
            ),
        ];

        // check if storage has been paid (the account has a wNEAR account)
        const storage = await account.viewFunction(
            WRAP_NEAR_CONTRACT_ID,
            "storage_balance_of",
            { account_id: accountId }
        );

        // if storage hasn't been paid, pay for storage (create an account)
        if (!storage) {
            exports.actions.unshift(
                transactions.functionCall(
                    "storage_deposit", // method to create an account
                    {},
                    30000000000000, // attached gas
                    utils.format.parseNearAmount('0.00125') // account creation costs 0.00125 NEAR for storage
                )
            );
        }

        // send batched transaction
        const result =  account.signAndSendTransaction({
            receiverId: WRAP_NEAR_CONTRACT_ID,
            actions,
        });
        return { status: 'success', result };
    } catch (e) {
        return {status: 'failed', message: e.message};

    }
}


exports.wrapNear = wrapNear;
exports.keyStores = keyStores;