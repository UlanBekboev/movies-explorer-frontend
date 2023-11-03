import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "../AuthForm/AuthForm.css";
import logo from "../../images/logo (1).svg";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ onRegistr, loggedIn, isLoading }) {
  const { pathname } = useLocation();
  const {
    enteredValues,
    handleChange,
    errors,
    isFormValid,
  } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistr(enteredValues);
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
          <h1 className="auth__title">Добро пожаловать!</h1>
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            id="name"
            onChange={handleChange}
            placeholder="Имя"
            name="name"
            type="text"
            value={enteredValues.name || ""}
            minLength={2}
            maxLength={30}
            required
            autoComplete="off"
            className={`${pathname === "/sign-up" ? "form__input" : "form__input_inactive"}`}
          />
          {errors.name && <span className="form__error">{errors.name}</span>}
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
            value={enteredValues.email || ""}
            required
            autoComplete="off"
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
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
            className={`form__button ${pathname === "/sign-in" && "form__button-enter"}`}
            disabled={!isFormValid || isLoading}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="auth__container">
          <div className="auth__signed">Уже зарегистрированы?</div>
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
