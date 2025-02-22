export interface CreateOrderParams {
  expected_output_amount: number; // 🔹 Debe ser un número
  input_currency: string; // 🔹 Nombre correcto según la API
  notes: string; // 🔹 Equivalente a `description`
  merchant_urlko?: string; // URL cuando el pago falla
  merchant_urlok?: string; // URL cuando el pago es exitoso
  merchant_url_standby?: string; // URL para espera de confirmación
}

export interface IOrder {
  identifier: string;
  reference: string;
  payment_uri: string; // 🔹 Usado como QR en la API
  web_url: string;
  address: string;
  tag_memo?: string;
  input_currency: string;
  expected_input_amount: number;
  rate: number;
  notes: string;
  fiat: string;
  language: string;
}

export interface IGetOrderInfo {
    identifier: string; // ID único del pago
    reference: string | null; // Referencia opcional
    created_at: string; // Fecha de creación del pago (ISO 8601)
    edited_at?: string; // Última edición del pago (opcional)
    status: "NR" | "EX" | "OC" | "CO" | "AC" | string; // Estado del pago
    fiat_amount: number; // Monto en moneda fiat
    crypto_amount: number; // Monto en criptomoneda
    unconfirmed_amount: number; // Monto no confirmado en la blockchain
    confirmed_amount: number; // Monto confirmado en la blockchain
    received_amount: number; // Monto recibido por el comercio
    currency_id: string; // ID de la criptomoneda utilizada
    merchant_device_id: number; // ID del dispositivo del comercio
    merchant_device: string; // Nombre del dispositivo del comercio
    address: string; // Dirección de la wallet donde enviar el pago
    tag_memo?: string; // Memo/tag opcional (XRP, ALGO, etc.)
    url_ko: string; // URL en caso de pago fallido
    url_ok: string; // URL en caso de pago exitoso
    url_standby: string; // URL de espera de confirmación
    expired_time: string; // Fecha de expiración del pago (ISO 8601)
    good_fee: boolean; // Indica si la transacción tiene una comisión favorable
    notes: string; // Concepto del pago
    rbf: boolean; // Si el pago es reemplazable por tarifa (Replace By Fee)
    safe: boolean; // Indica si el pago es seguro
    fiat: string; // Moneda fiat utilizada (EUR, USD, etc.)
    language: string; // Idioma de la pasarela (ES, EN, etc.)
    percentage: number; // Porcentaje de comisión aplicada
    balance_based: string; // Tipo de balance utilizado
    internal_data?: string; // Datos internos del sistema
    transactions: ITransaction[]; // Lista de transacciones asociadas
  }
  
  // 🔹 Definición de una transacción dentro de una orden
  export interface ITransaction {
    confirmed: boolean; // Indica si la transacción está confirmada en la blockchain
    currency: string; // Moneda utilizada en la transacción
    amount: number; // Monto de la transacción
    tx_hash: string; // Hash de la transacción en la blockchain
    block: number; // Número de bloque en el que fue incluida
    created_at: string; // Fecha de la transacción (ISO 8601)
  }
  