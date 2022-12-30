import React from 'react';
import logo from './logo.svg';
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

function App() {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = React.useMemo(() => "http://127.0.0.1:8899", [network]);
  // const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [

      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      // new LedgerWalletAdapter(),
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
                {/*<div className={"center width70"}>*/}
                <Sweeper />
                <FAQ />
                {/*</div>*/}
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
