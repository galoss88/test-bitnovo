import { BrowserProvider, JsonRpcSigner, parseEther } from "ethers";
import { useEffect, useState } from "react";

export const useWeb3 = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new BrowserProvider(window.ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("Metamask no está instalado.");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error("Error conectando la wallet:", error);
    }
  };

  const sendTransaction = async (order: {
    address: string;
    crypto_amount: number;
  }) => {
    if (!provider || !walletAddress) return;

    try {
      const signer: JsonRpcSigner = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: order.address,
        value: parseEther(order.crypto_amount.toString()),
      });

      console.log("📡 Transacción enviada:", tx);
      await tx.wait();
      console.log("✅ Transacción confirmada.");
    } catch (error) {
      console.error("❌ Error en la transacción:", error);
    }
  };

  return { connectWallet, sendTransaction, isConnected, walletAddress };
};
