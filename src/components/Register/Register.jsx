import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useLocation, Navigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';

function Register(props) {
  const { pathname } = useLocation();
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(values);
  }

  if (props.loggedIn) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <>
      <AuthForm
        loggedIn={props.loggedIn}
        onEmailChange={handleChange}
        onPasswordChange={handleChange}
        onSubmit={handleSubmit}
        email={values.email}
        password={values.password}
        error={errors.name || errors.email || errors.password}
        isValid={isValid}
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