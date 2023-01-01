import React from 'react';
import './App.css';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter, SolletWalletAdapter, SolletExtensionWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import FAQ from './components/FAQ';
import Footer from './components/footer';
import Menu from './components/menu';
import Sweeper from './components/sweeper';
import { Container } from '@mui/material';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import FngChart from './components/fng_chart';

function App() {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = React.useMemo(() => "https://rpc.ankr.com/solana", [network]);
  // const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [

      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="App">
            <Menu />
            <div className={"gradient-lottery"}>
              <Container maxWidth={'lg'}>
                <Sweeper />
                <FngChart />
                <FAQ />
              </Container>
              <Footer />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
