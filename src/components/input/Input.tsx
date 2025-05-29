import { useState } from "react";

interface InputType {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errors?: string[];
}

const Input = ({
  label = "",
  type = "text",
  placeholder = "",
  className = "",
  errors = [],
}: InputType) => {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor="input" className="text-lg">
        {label}
      </label>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        className={`py-2 border-b-2 border-coolGray outline-0 ${className}`}
      />
      {errors.length > 0 && <p className="text-red-500">* {errors[0]}</p>}
    </div>
  );
};

export default Input;
