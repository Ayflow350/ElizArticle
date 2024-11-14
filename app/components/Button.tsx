import { ScaleLoader } from "react-spinners"; // Import ScaleLoader

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  label: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  isLoading = false,
  type = "button",
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
        label // Show label when not loading
      )}
    </button>
  );
};

export default Button;
