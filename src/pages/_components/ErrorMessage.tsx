interface FormErrorMessageProps {
  readonly message: string;
}

export default function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-3 mt-2 mb-3 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm">
      <svg
        className="w-5 h-5 text-red-700"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8 3a1 1 0 100-2 1 1 0 000 2zm0-6a1 1 0 011 1v2a1 1 0 11-2 0V8a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
