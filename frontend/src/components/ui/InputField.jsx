import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label fw-semibold mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
