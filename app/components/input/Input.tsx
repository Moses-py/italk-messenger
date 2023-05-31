"use client";

import clsx from "clsx";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  required,
  errors,
  disabled,
}) => {
  return (
    <div>
      <div className="mt-2">
        <input
          placeholder={label}
          id={id}
          type={type}
          autoCapitalize={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block
            w-full
            border-0
            p-3
            text-gray-900
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-gray-400
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
