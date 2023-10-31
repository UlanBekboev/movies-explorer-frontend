import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login(props) {
  return (
    <>
      <AuthForm
        title="Рады видеть!"
        button="Войти"
        question="Ещё не зарегистрированы?"
        action="Регистрация"
        path="/sign-up"
      />
    </>
  );
}

export default Login;