const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "4573fc632b934d82b1006ac41f9c2db4";
//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {
    development : {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    ropsten : {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/4573fc632b934d82b1006ac41f9c2db4`),
      network_id: 3,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  }
};
