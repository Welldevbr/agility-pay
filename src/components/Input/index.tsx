import { ComponentProps, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  labelError?: string;
}

export function Input({ label, error, labelError, ...props }: InputProps) {
  return (
    <div>
      <label className="text-[#A6A0BB] text-sm font-normal">{label}</label>
      <input
        className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1">
          <p className="text-red-600 mt-1 text-sm font-medium">{labelError}</p>
        </div>
      )}
    </div>
  );
}
