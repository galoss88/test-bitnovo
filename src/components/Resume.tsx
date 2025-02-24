import { ReactNode } from "react";

export interface IResume {
  label: string;
  value: ReactNode;
}

const ResumeItem = ({ label, value }: IResume) => (
  <div className="flex justify-between w-full py-2 border-b last:border-0">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

interface ResumeOrderProps {
  resumeOrderItems: IResume[]; 
}

const ResumeOrder = ({ resumeOrderItems }: ResumeOrderProps) => (
  <div className="flex flex-col p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
    <h1 className="text-1xl font-bold text-black mb-4">Resumen del pedido</h1>
    <div className="w-full bg-gray-100 p-6 rounded-lg">
      {resumeOrderItems.map((item) => (
        <ResumeItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default ResumeOrder;
