"use client";

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on showPassword state
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={inputType}
        className={`
          peer h-14   w-[350px] md:w-[400px] px-4 text-lg text-[#1C1B1F] bg-white border rounded-lg outline-none transition-all duration-300
          ${errors[id] ? "border-rose-500" : "border-[#79747E]"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      />
      <label
        className={`
          absolute left-4 text-base font-medium bg-[#fffbf0] px-1 transition-all duration-300
          ${errors[id] ? "text-rose-500" : "text-[#1C1B1F]"}
          ${
            errors[id] || required
              ? "top-0 -translate-y-[50%] bg-white "
              : "top-1/2 -translate-y-1/2 bg-[#fffbf0]"
          }
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 bg-white
          peer-focus:top-0 peer-focus:-translate-y-[50%]
        `}
      >
        {label}
        {required && (
          <span className="text-rose-400 ml-1 text-2xl bg-white">*</span>
        )}
      </label>

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
    </div>
  );
};

export default Input;
