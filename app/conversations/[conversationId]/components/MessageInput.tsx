"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  required,
  register,
}) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        rows={1}
        className="
          text-black
          font-light
          px-4
          bg-neutral-100 
          w-full 
          rounded-sm
          focus:outline-none
          text-[16px]
          py-3
        "
      />
    </div>
  );
};

export default MessageInput;
