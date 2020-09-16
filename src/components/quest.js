import web3 from './web3';
import quest from '../abis/quest.json';

export default address => {
    return new web3.eth.Contract(quest.abi, "0x71F94CEF306d239a2c8f3B5B26ce8B5d5C9a127D");
  };
