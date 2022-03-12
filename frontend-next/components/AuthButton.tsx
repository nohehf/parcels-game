import * as React from "react";
import { useAccount, useConnect } from "wagmi";
import toast from "react-hot-toast";

const AuthButton: React.FunctionComponent<any> = (props) => {
  const [{ data, error, loading }, connect] = useConnect();
  const [accountQuery] = useAccount();

  React.useEffect(() => {
    if (error?.name === "ConnectorNotFoundError") {
      toast.error("MetaMask extension required to sign in");
    }
  }, [error]);

  const providerOptions = {
    /* See Provider Options Section */
  };

  // If not authenticated, require sign-in
  if (!accountQuery.data?.address) {
    return (
      //test actuel
      <>
        <div>Connected: {data.connected.toString()}</div>

        {data.connectors.map((x) => (
          <button key={x.name} onClick={() => connect(x)}>
            {x.name}
          </button>
        ))}
      </>
      //code original :

      // <button
      //   onClick={() => {
      //     connect(connectQuery.data.connectors[0]);
      //   }}
      // >
      //   Sign In
      // </button>

      //truc qui marche pas
      // <web3Modal />
    );
  }

  // If authenticated, show button as usual
  return <button {...props}>{props.children}</button>;
};

export default AuthButton;
