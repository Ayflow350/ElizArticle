"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  label: string;
  type?: "button" | "submit" | "reset"; // Added type prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      type={type} // Use the type prop
      onClick={onClick}
      disabled={disabled}
      className="
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        w-[300px]
        bg-black
        py-4
        border-black
        text-white
        mb-5
      "
    >
      {label}
    </button>
  );
};

export default Button;
