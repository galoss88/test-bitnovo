import { useState, useEffect } from "react";
import { Web3Provider, MetamaskProvider } from "@/lib/web3";

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<Web3Provider | null>(null);

  useEffect(() => {
    const metamask = new MetamaskProvider();
    metamask.getAccount().then(setAccount);
    setProvider(metamask);
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    try {
      const acc = await provider.connect();
      setAccount(acc);
    } catch (error) {
      console.error("Error al conectar con Web3:", error);
    }
  };

  return { account, connectWallet };
}
