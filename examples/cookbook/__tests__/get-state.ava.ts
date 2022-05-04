import { workspace } from './utils'
import { providers } from '../../../lib'
const moduleExample = require('../utils/get-state')
const { getState } = moduleExample

workspace.test('get state', async (test, { alice, status_message }) => {
    const config = status_message["manager"]["config"];
    const METHOD_NAME = 'get_status';
    const ACCOUNT_ID = 'status_message.test.near';
    const ARGS_BASE64 = 'eyJhY2NvdW50X2lkIjogImFsaWNlLnRlc3QubmVhciJ9Cg=='

    //first we set alice's status to obtain it in the future
    await alice.call(status_message, 'set_status', { message: 'My name is Alice' })

    moduleExample.provider = new providers.JsonRpcProvider(config.rpcAddr);
    // now we can make sure that querying status message yields {"account_id": "alice.test.near"}
    test.is((await getState(ACCOUNT_ID, METHOD_NAME,ARGS_BASE64)).result, 'My name is Alice');
})