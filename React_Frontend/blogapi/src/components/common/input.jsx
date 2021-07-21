import React from "react";
import DarkContext from "../../context/darkMode";

const Input = ({ name, label, value, type, error, onChange }) => {
  return (
    <DarkContext.Consumer>
      {(darkContext) => (
        <div className="form-group">
          <label
            className={darkContext.darkMode ? "text-light" : ""}
            htmlFor={name}
          >
            {label}
          </label>
          <input
            className={
              darkContext.darkMode
                ? "form-control me-2 bg-dark text-light"
                : "form-control me-2"
            }
            value={value}
            onChange={onChange}
            id={name}
            type={type}
            name={name}
            placeholder={name}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      )}
    </DarkContext.Consumer>
  );
};

export default Input;
