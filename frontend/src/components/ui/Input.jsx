import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
    return (
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;

