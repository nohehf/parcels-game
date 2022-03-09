import * as React from "react";
import { useAccount, useConnect } from "wagmi";
import toast from "react-hot-toast";

const AuthButton: React.FunctionComponent<any> = (props) => {
  const [connectQuery, connect] = useConnect();
  const [accountQuery] = useAccount();

  React.useEffect(() => {
    if (connectQuery.error?.name === "ConnectorNotFoundError") {
      toast.error("MetaMask extension required to sign in");
    }
  }, [connectQuery.error]);

  // If not authenticated, require sign-in
  if (!accountQuery.data?.address) {
    return (
      <button
        {...props}
        onClick={() => {
          connect(connectQuery.data.connectors[0]);
        }}
      >
        Sign In
      </button>
    );
  }

  // If authenticated, show button as usual
  return <button {...props}>{props.children}</button>;
};

export default AuthButton;
