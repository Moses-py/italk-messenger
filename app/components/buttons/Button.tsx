"use client";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        `
        flex
        justify-center
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
    `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-black hover:bg-gray-800 focus-visible:outline-gray-800"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
