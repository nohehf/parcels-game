import "../styles/globals.css";
import "../styles/index.css";

import type { AppProps } from "next/app";
import Nav from "../components/Nav";

import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { Provider as WagmiProvider } from "wagmi";
import { Toaster, toast } from "react-hot-toast";
import { providers } from "ethers";

import styles from "../styles/clouds.module.css";

// Provider that will be used when no wallet is connected (aka no signer)
// const provider = providers.getDefaultProvider("http://localhost:8545");
const provider = providers.getDefaultProvider();
// const provider = new providers.getDefaultProvider('optimism-kovan');
// const provider = new providers.InfuraProvider("optimism-kovan", "6719e73a821848e7b94701e9fa5590fa");
// const provider = new providers.AlchemyProvider("optimism-kovan");

// const provider = new providers.AlchemyProvider("rinkeby", "3ANw5WNTJdc_aK7ApwGpzWBYb_9MDnWr")
// const provider = new providers.InfuraProvider("rinkeby", "3a6a7bfc4aac4df299f637c57104f2c2")
// const provider = providers.getDefaultProvider("rinkeby", 
//   etherscan="PZGHF4PVPSQRARMV5GQYK5VYC12BFQEWYI",
//   infura="6719e73a821848e7b94701e9fa5590fa",
//   alchemy ="3ANw5WNTJdc_aK7ApwGpzWBYb_9MDnWr",
// )

// const provider = providers.getDefaultProvider("https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

// const provider = providers.getDefaultProvider();

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // onError: () => {
    //   toast.error(
    //     "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
    //   );
    // },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <QueryClientProvider client={queryClient}>
        <div className={styles.cloudBg}>
          <div className="h-[7%]">
            <Nav />
          </div>

          <div className="h-[93%]">
            <Component {...pageProps} />
          </div>

          <Toaster />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
