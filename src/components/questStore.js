import web3 from './web3';
import questStore from '../abis/questStore';

const instance = new web3.eth.Contract(
    questStore.abi,
    "0xa4ffF8431df6F711E59a5Bafd65979DF2Da57730"
  );

export default instance;
