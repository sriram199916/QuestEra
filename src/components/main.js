import web3 from './web3';
import main from '../abis/main';

const instance = new web3.eth.Contract(
    main.abi,
    "0x6eA30DC7CFE4B7fcB4b20705fd45e0714B89A4f6"
  );

  web3.eth.handleRevert=true;

export default instance;
