import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useLocation, Navigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';

function Register(props) {
  const { pathname } = useLocation();
  const { enteredValues, handleChange, errors, isFormValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(enteredValues);
  }

  if (props.isLoggedIn) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <>
      <AuthForm
        nameInput={
          <>
            <label
              className="form__label">
              Имя
            </label>
            <input
              onChange={handleChange}
              placeholder="Имя"
              name="name"
              type="text"
              value={enteredValues.name || ""}
              minLength={2}
              maxLength={30}
              required
              autoComplete="off"
              className={`${
                pathname === "/sign-up" ? "form__input" : "form__input_inactive"
              }`}
            />
          </>
        }
        isLoggedIn={props.isLoggedIn}
        onNameChange={handleChange}
        onEmailChange={handleChange}
        onPasswordChange={handleChange}
        submit={handleSubmit}
        name={enteredValues.name}
        email={enteredValues.email}
        password={enteredValues.password}
        error={errors.name || errors.email || errors.password}
        isValid={isFormValid}
        title="Добро пожаловать!"
        action="Зарегистрироваться"
        question="Уже зарегистрированы?"
        answer="Войти"
        path="/sign-in"
      />
    </>
  );
}

export default Register;