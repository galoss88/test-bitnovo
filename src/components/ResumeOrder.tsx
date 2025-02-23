const resumeItems = [
  { label: "Importe", value: "100.00" },
  { label: "Moneda seleccionada", value: "USD" },
  { label: "Comercio", value: "Tienda de ejemplo" },
  { label: "Fecha", value: "2021-10-10" },
  { label: "Concepto", value: "Pago de ejemplo" },
];

const ResumeItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between w-full py-2 border-b last:border-0">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

const ResumeOrder = () => (
  <div className="flex flex-col p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
    <h1 className="text-1xl font-bold text-black mb-4">Resumen del pedido</h1>
    <div className="w-full bg-gray-100 p-6 rounded-lg">
      {resumeItems.map((item) => (
        <ResumeItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default ResumeOrder;
