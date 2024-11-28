import { ScaleLoader } from "react-spinners"; // Import ScaleLoader
import React from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  label: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // Add icon prop to allow React elements
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  isLoading = false,
  type = "button",
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="
        relative
        flex
        items-center
        justify-center
        gap-2
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
      {isLoading ? (
        <ScaleLoader color="#ffffff" height={20} width={4} /> // Show ScaleLoader when loading
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}{" "}
          {/* Render the icon */}
          <span>{label}</span> {/* Render the label */}
        </>
      )}
    </button>
  );
};

export default Button;
