import React from "react";
import "../index.css"

const InputField = ({
  type,
  name,
  value,
  className,
  onChange,
  disabled,
  readOnly,
  placeholder,
  required,
  accept
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        required = {required}
        accept={accept}
      />
    </>
  );
};

export default InputField;
