import { useState } from "react";
import { ethers } from "ethers";

export const useWeb3 = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("Error conectando la wallet:", error);
      }
    } else {
      alert("Por favor, instala Metamask.");
    }
  };

  const sendTransaction = async (order: any) => {
    if (!window.ethereum) return alert("Instala Metamask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: order.address,
        value: ethers.parseEther(order.fiat_amount.toString()),
      });

      console.log("Transacción enviada:", tx);
    } catch (error) {
      console.error("Error al enviar la transacción:", error);
    }
  };

  return { connectWallet, sendTransaction, isConnected, walletAddress };
};
