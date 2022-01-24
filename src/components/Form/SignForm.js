import React from 'react';
import PropTypes from 'prop-types';
import './SignForm.scss';

function SignForm({ children, onSubmit }) {
  return (
    <div className="sign__card">
      <div className="sign__card__content">
        <form className="flex" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

SignForm.Input = function SignFormInput({
  children,
  placeholder,
  id,
  type,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="fs-400 bg-grey text-white"
      onChange={onChange}
      value={value}
    >
      {children}
    </input>
  );
};
SignForm.Label = function SignFormLabel({ children, id }) {
  return (
    <label htmlFor={id} className="sr-only">
      {children}
    </label>
  );
};

SignForm.Submit = function SignFormSubmit({ children, disabled }) {
  return (
    <button type="submit" className="btn fs-500 fw-700" disabled={disabled}>
      {children}
    </button>
  );
};

SignForm.Continue = function SignFormContinue({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      className="btn btn--continue fs-500 fw-700"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

SignForm.Error = function SignFormError({ children }) {
  return (
    <div className="sign__card__error fs-400 fw-700 text-grey">{children}</div>
  );
};

SignForm.Message = function SignFormMessage({ children }) {
  return (
    <div className="sign__card__message fs-400 fw-700 text-grey">
      {children}
    </div>
  );
};

SignForm.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};
SignForm.Error.propTypes = {
  children: PropTypes.node,
};
SignForm.Submit.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

SignForm.Continue.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

SignForm.Message.propTypes = {
  children: PropTypes.node,
};
SignForm.Label.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};
SignForm.Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SignForm;
