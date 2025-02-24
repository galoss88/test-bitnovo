import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}

export interface Web3Provider {
  connect: () => Promise<string>;
  disconnect: () => void;
  getAccount: () => Promise<string | null>;
}

export class MetamaskProvider implements Web3Provider {
  private provider: BrowserProvider | null = null;

  async connect(): Promise<string> {
    if (!window.ethereum) {
      throw new Error("Metamask no está instalado");
    }

    this.provider = new BrowserProvider(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }

  async getAccount(): Promise<string | null> {
    if (!this.provider) return null;
    const signer = await this.provider.getSigner();
    return signer.getAddress();
  }

  disconnect() {
    this.provider = null;
  }
}
