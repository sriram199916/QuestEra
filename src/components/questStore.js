import web3 from './web3';
import questStore from '../abis/questStore';

const instance = new web3.eth.Contract(
    questStore.abi,
    questStore.networks[5777].address
  );
  
export default instance;