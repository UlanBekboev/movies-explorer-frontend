import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { Navigate } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";


function Login(props) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values);
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
        error={errors.email || errors.password}
        isValid={isValid}
        title="Рады видеть!"
        action="Войти"
        question="Ещё не зарегистрированы?"
        answer="Регистрация"
        path="/sign-up"
      />
    </>
  );
}

export default Login;