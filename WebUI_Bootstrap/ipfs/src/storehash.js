/* eslint no-eval: 0 */
import web3 from './web3';
import StoreHash from './StoreHash.json';


//console.log(address);
const address = JSON.stringify(StoreHash.networks["5777"].address);

//console.log(abi);
var abi = eval(JSON.stringify(StoreHash.abi));

export default new web3.eth.Contract(abi, address.replace(/"/g,""));
