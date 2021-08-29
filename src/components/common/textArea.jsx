import React from "react";
import DarkContext from "../../context/darkMode";

const TextArea = ({ name, label, value, error, onChange, placeholder }) => {
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
          <textarea
            className={
              darkContext.darkMode
                ? "form-control me-2 bg-dark text-light"
                : "form-control me-2"
            }
            value={value}
            onChange={onChange}
            id={name}
            name={name}
            placeholder={placeholder}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      )}
    </DarkContext.Consumer>
  );
};

export default TextArea;
