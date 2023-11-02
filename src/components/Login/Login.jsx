import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { Navigate } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";


function Login(props) {
  const { enteredValues, handleChange, errors, isFormValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(enteredValues);
  }

  if (props.isLoggedIn) {
    return <Navigate to="/movies" replace />;
  }


  return (
    <>
      <AuthForm
        isLoggedIn={props.isLoggedIn}
        onEmailChange={handleChange}
        onPasswordChange={handleChange}
        submit={handleSubmit}
        email={enteredValues.email}
        password={enteredValues.password}
        error={errors.email || errors.password}
        isValid={true}
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