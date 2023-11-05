import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "../AuthForm/AuthForm.css";
import logo from "../../images/logo (1).svg";
import useFormValidation from "../../hooks/useFormValidation";

function Login({ onLogin, isLoading, loggedIn }) {
  const { pathname } = useLocation();
  const { enteredValues, handleChange, errors, isFormValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(enteredValues);
  }

  if (loggedIn) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <section className="auth">
      <div className="auth__content">
        <Link to="/" className="auth__logo-link">
          <img src={logo} alt="Логотип страницы" className="auth__logo" />
        </Link>
        <form
          onSubmit={handleSubmit}
          disabled={!isFormValid}
          className="auth__form form"
        >
          <h1 className="auth__title">Рады видеть!</h1>
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            id="email"
            className="form__input"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            type="email"
            pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$"
            value={enteredValues.email || ""}
            required
            autoComplete="off"
          />
          {errors.email && (
            <span className="form__error">{errors.email}</span>
          )}
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            id="password"
            className="form__input"
            onChange={handleChange}
            placeholder="Пароль"
            name="password"
            type="password"
            value={enteredValues.password || ""}
            minLength={8}
            maxLength={64}
            required
            autoComplete="off"
          />
          {errors.password && (
            <span className="form__error_password">{errors.password}</span>
          )}
          <button
            type="submit"
            className={!isFormValid || isLoading
              ? "form__button_inactive"
              : "form__button"}
            disabled={!isFormValid && "form__button_inactive"}
          >
            Войти
          </button>
        </form>
        <div className="auth__container">
          <div className="auth__signed">Ещё не зарегистрированы?</div>
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
