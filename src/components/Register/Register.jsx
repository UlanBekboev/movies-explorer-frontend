import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  return (
    <>
      <AuthForm
        title="Добро пожаловать!"
        button="Зарегистрироваться"
        question="Уже зарегистрированы?"
        action="Войти"
        path="/sign-up"
      />
    </>
  );
}

export default Register;