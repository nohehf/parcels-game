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
const provider = providers.getDefaultProvider("http://localhost:8545");
// const ALCHEMY_API_KEY = "3ANw5WNTJdc_aK7ApwGpzWBYb_9MDnWr";
// const provider = ethers.getDefaultProvider("rinkeby", {alchemy: ALCHEMY_API_KEY});

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
      );
    },
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
