import { useWeb3 } from "@/application/hooks/useWeb3";
import { IGetOrderInfo } from "@/lib/api/types";
import Image from "next/image";

const Web3Payment = ({ order }: { order: IGetOrderInfo }) => {
  const { connectWallet, sendTransaction, isConnected, walletAddress } =
    useWeb3();

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl  border-gray-200 max-w-sm mx-auto">
      {/* Imagen de Metamask */}
      <div className="w-36 h-36 flex items-center justify-center rounded-xl bg-white shadow-md border">
        <Image
          src="/metamaskImage.png"
          alt="Metamask"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Estado de la Wallet */}
      {isConnected ? (
        <>
          <p className="text-gray-700 text-sm mt-4">
            Conectado: <span className="font-semibold">{walletAddress}</span>
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full mt-4 transition-all"
            onClick={() => sendTransaction(order)}
          >
            Pagar con Web3
          </button>
        </>
      ) : (
        <button
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 w-full mt-4 transition-all"
          onClick={connectWallet}
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
};

export default Web3Payment;
