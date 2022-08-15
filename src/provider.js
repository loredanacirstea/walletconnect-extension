import Client from "@walletconnect/sign-client/dist/index.es";
import WalletConnectEthereumProvider from "@walletconnect/ethereum-provider/dist/index.es";
import provider from "eth-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import * as constants from './constants';

async function initWC() {
  const client = await Client.init({
    logger: constants.DEFAULT_LOGGER,
    relayUrl: constants.DEFAULT_RELAY_URL,
    projectId: constants.DEFAULT_PROJECT_ID,
  });

  console.log("----client", client);
  console.log("----pairings", client.pairing.values);
  const pairing = client.pairing.values.length > 1 ? client.pairing.values[client.pairing.values.length - 1] : {};
  console.log('pairing', pairing);
  let session;

  try {
    const { uri, approval } = await client.connect({
      // Optionally: pass a known prior pairing (e.g. from `client.pairing.values`) to skip the `uri` step.
      // pairingTopic: pairing.topic,

      // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
      requiredNamespaces: {
        eip155: {
          methods: [
            "eth_sendTransaction",
            "eth_signTransaction",
            "eth_sign",
            "personal_sign",
            "eth_signTypedData",
          ],
          chains: ["eip155:1", "eip155:4", "eip155:42"],
          // chains: [],
          events: ["chainChanged", "accountsChanged"],
        },
      },
    });

    // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
    if (uri) {
      QRCodeModal.open(uri, () => {
        console.log("EVENT", "QR Code Modal closed");
      });
    }

    // Await session approval from the wallet.
    session = await approval();
  } catch (e) {
    console.error(e);
  } finally {
    // Close the QRCode modal in case it was open.
    QRCodeModal.close();
  }

  // Handle the returned session (e.g. update UI to "connected" state).
  // await onSessionConnected(session);
  console.log("----SESSION CONNECTED session", session);
  console.log("----SESSION CONNECTED peer", session.peer.metadata);
  // session.peer.metadata.name | description | icons - wallet
  // session.self.metadata - for the dapp
  // session.requiredNamespaces
  // session.namespaces

  const chainId = 4;
  const wcProvider = new WalletConnectEthereumProvider({
    chainId: Number(chainId),
    rpc: {
      infuraId: constants.DEFAULT_INFURA_ID,
      chainId: Number(chainId),
      custom: constants.RPC_MAP,
    },
    client,
    // relay: 'iridium',
    rpcMap: constants.RPC_MAP,
    methods: [
      "eth_sendTransaction",
      "eth_signTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData",
    ],
    events: ["chainChanged", "accountsChanged"],
  });
  return wcProvider;
}




const fallbackProvider = provider([
  "https://mainnet.infura.io/v3/" + constants.DEFAULT_INFURA_ID,
]);

fallbackProvider.enable = async () => {
  console.log("ENABLE??")
  const wcProvider = await initWC();
  window.ethereum = wcProvider;
  console.log("ENABLEING new provider", wcProvider);
  return wcProvider.enable();
};

window.ethereum = fallbackProvider;

console.log("---fallbackProvider---", window.ethereum);