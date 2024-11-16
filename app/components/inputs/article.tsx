import { useState } from "react";
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
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  disabled,
  register,
  required,
  errors,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputType = type === "password" && showPassword ? "text" : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          ...(type === "number" && { valueAsNumber: true }),
        })}
        placeholder=" "
        type={inputType}
        value={inputValue}
        onChange={handleInputChange}
        className={`
          peer h-14  w-[350px] md:w-[400px] px-4 text-lg text-[#1C1B1F] bg-white border rounded-lg outline-none transition-all duration-300
          ${errors[id] ? "border-rose-500" : "border-[#79747E]"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      />

      {inputValue === "" && (
        <label
          htmlFor={id}
          className={`
            absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 italic pointer-events-none transition-all duration-300
            ${errors[id] ? "text-rose-500" : ""}
          `}
        >
          {placeholder ||
            (type === "password"
              ? "Password"
              : id.charAt(0).toUpperCase() + id.slice(1))}
        </label>
      )}

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-5 text-gray-600"
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
    </div>
  );
};

export default Input;
