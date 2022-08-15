export const DEFAULT_MAIN_CHAINS = [
    // mainnets
    "eip155:1",
    "eip155:10",
    "eip155:100",
    "eip155:137",
    "eip155:42161",
    "eip155:42220",
];
  
export const DEFAULT_TEST_CHAINS = [
    // testnets
    "eip155:42",
    "eip155:69",
    "eip155:80001",
    "eip155:421611",
    "eip155:44787",
];

export const DEFAULT_CHAINS = [...DEFAULT_MAIN_CHAINS, ...DEFAULT_TEST_CHAINS];

export const DEFAULT_EIP155_METHODS = ["eth_sendTransaction", "personal_sign", "eth_signTypedData"];

export const DEFAULT_LOGGER = "debug";

export const DEFAULT_PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
export const DEFAULT_RELAY_URL = process.env.REACT_APP_RELAY_URL;
// export const DEFAULT_RELAY_URL = "https://relay.walletconnect.com";

export const DEFAULT_INFURA_ID = "8b014620351a4cbe814220743619df5b";

export const RPC_MAP1 = {
    '1': {
        name: 'Ethereum Mainnet',
        chainId: 'eip155:1',
        rpcUrl: 'api.mycryptoapi.com/eth',
        testNet: false,
        derivationPath: "m/44'/60'/0'/0",
        nativeAsset: 'ETH',
    },
    '4': {
        name: 'Ethereum Rinkeby',
        chainId: 'eip155:4',
        rpcUrl: 'https://rinkeby.infura.io/v3/',
        testNet: true,
        derivationPath: "m/44'/60'/0'/0",
        nativeAsset: 'ETH',
    },
    '5': {
        name: 'Ethereum Goerli',
        chainId: 'eip155:5',
        rpcUrl: 'rpc.goerli.mudit.blog',
        testNet: true,
        derivationPath: "m/44'/60'/0'/0",
        nativeAsset: 'ETH',
    },
    '42': {
        name: 'Ethereum Kovan',
        chainId: 'eip155:42',
        rpcUrl: 'https://kovan.infura.io/v3/',
        testNet: true,
        derivationPath: "m/44'/60'/0'/0",
        nativeAsset: 'ETH',
    },
}

export const RPC_MAP = {
    '1': 'https://mainnet.infura.io/v3/',
    '4': 'https://rinkeby.infura.io/v3/',
    '5': 'https://goerli.infura.io/v3/',
    '42': 'https://kovan.infura.io/v3/',
}

Object.keys(RPC_MAP).map(key => {
    RPC_MAP[key] += DEFAULT_INFURA_ID;
});