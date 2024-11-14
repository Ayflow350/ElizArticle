import { useState, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  id: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  disabled,
  register,
  required,
  errors,
  placeholder,
  defaultValue = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  // Update inputValue if defaultValue changes
  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  // Determine input type based on showPassword state
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update inputValue on change
  };

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          ...(type === "number" && { valueAsNumber: true }), // For number type
        })}
        placeholder=" " // Placeholder for styling
        type={inputType}
        value={inputValue} // Controlled component with value prop
        onChange={handleChange} // Update inputValue on change
        className={`
          peer h-14 w-[400px] px-4 text-lg text-[#1C1B1F] bg-white border rounded-lg outline-none transition-all duration-300
          ${errors[id] ? "border-rose-500" : "border-[#79747E]"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      />

      {/* Show/Hide Password Button */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-5 text-gray-600"
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}

      {/* Visual Placeholder */}
      {!inputValue && ( // Render placeholder only if inputValue is empty
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 italic pointer-events-none">
          {placeholder ||
            (type === "password"
              ? "Password"
              : id.charAt(0).toUpperCase() + id.slice(1))}
        </span>
      )}
    </div>
  );
};

export default Input;
