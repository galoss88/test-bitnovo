import { ReactNode } from "react";

export interface IResume {
  label: string;
  value: ReactNode;
}

const ResumeItem = ({ label, value }: IResume) => (
  <div className="flex justify-between items-center w-full py-3 border-b border-gray-200 last:border-0">
    <span className="text-primary font-bold">{label}:</span>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

interface ResumeOrderProps {
  resumeOrderItems: IResume[];
}

const ResumeOrder = ({ resumeOrderItems }: ResumeOrderProps) => (
  <div className="bg-gray-100 bg-opacity-80 rounded-xl p-6">
    <div className="space-y-4">
      {resumeOrderItems.map((item) => (
        <ResumeItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default ResumeOrder;
