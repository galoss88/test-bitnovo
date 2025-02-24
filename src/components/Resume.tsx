import { ReactNode } from "react";

export interface IResume {
  label: string;
  value: ReactNode;
}

const ResumeItem = ({ label, value }: IResume) => (
  <div className="flex justify-between items-center w-full py-3 border-b last:border-0">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

interface ResumeOrderProps {
  resumeOrderItems: IResume[];
}

const ResumeOrder = ({ resumeOrderItems }: ResumeOrderProps) => (
  <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 max-w-md w-full">
    <h1 className="text-xl font-semibold text-gray-900 mb-4">
      Resumen del pedido
    </h1>
    <div className="w-full bg-gray-50 p-5 rounded-lg">
      {resumeOrderItems.map((item) => (
        <ResumeItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default ResumeOrder;
