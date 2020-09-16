import web3 from './web3';
import quest from '../abis/quest.json';

export default address => {
    return new web3.eth.Contract(quest.abi, address);
  };