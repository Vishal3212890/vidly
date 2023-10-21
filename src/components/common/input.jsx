import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor="username" className="form-label">
        {label}
      </label>
      <input className="form-control" id={name} name={name} {...rest} />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
