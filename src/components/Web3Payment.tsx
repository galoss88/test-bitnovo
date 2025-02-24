"use client";

import { useWeb3 } from "@/application/hooks/useWeb3";
import { FaEthereum } from "react-icons/fa";

export default function Web3Payment() {
  const { account, connectWallet } = useWeb3();

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
        Pagar con Web3
      </h2>

      {account ? (
        <div className="flex flex-col items-center">
          <FaEthereum className="text-5xl text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Conectado como:</p>
          <p className="font-semibold text-gray-800">{account}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Desconectar
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full p-3 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700"
        >
          Conectar con Metamask
        </button>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getOrderInfo } from "@/lib/api/orders";
// import { BrowserProvider } from "ethers"; // ✅ Cambia la importación si usas ethers v6

// // Declara la interfaz de la orden
// interface Order {
//   id: string;
//   status: string;
//   amount: number;
//   currency: string;
//   paymentAddress: string;
// }

// declare global {
//   interface Window {
//     ethereum?: any; // ✅ Agrega soporte para MetaMask en TypeScript
//   }
// }

// export default function Web3Payment() {
//   const params = useParams();
//   const id = typeof params.id === "string" ? params.id : undefined;
//   const [order, setOrder] = useState<Order | null>(null);
//   const [provider, setProvider] = useState<BrowserProvider | null>(null);
//   const [account, setAccount] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return; // ✅ Evita llamadas a la API si id es undefined

//     async function fetchOrder() {
//       try {
//         const data = await getOrderInfo(id??"");
//         setOrder(data);
//       } catch (error) {
//         console.error("Error obteniendo información del pedido:", error);
//       }
//     }
//     fetchOrder();
//   }, [id]);

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask no está instalado");
//       return;
//     }

//     try {
//       const web3Provider = new BrowserProvider(window.ethereum); // ✅ Usa `BrowserProvider` en ethers v6
//       setProvider(web3Provider);

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error("Error conectando con MetaMask:", error);
//     }
//   };

//   const sendPayment = async () => {
//     if (!provider || !order) return;

//     try {
//       const signer = await provider.getSigner();
//       const tx = await signer.sendTransaction({
//         to: order.paymentAddress,
//         value: (BigInt(order.amount) * BigInt(10 ** 18)).toString(), // ✅ Convierte a wei
//       });

//       await tx.wait();
//       alert("Pago enviado con éxito");
//     } catch (error) {
//       console.error("Error enviando el pago:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Pago con Web3</h2>
//       {!account ? (
//         <button
//           onClick={connectWallet}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Conectar con MetaMask
//         </button>
//       ) : (
//         <>
//           <p className="mb-4">Cuenta conectada: {account}</p>
//           <button
//             onClick={sendPayment}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Enviar pago
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
