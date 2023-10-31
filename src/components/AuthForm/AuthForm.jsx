import { Link, useLocation } from "react-router-dom";
import "./AuthForm.css";
import logo from "../../images/logo (1).svg";

function AuthForm(props) {
  const { pathname } = useLocation();

  return (
    <section className="auth">
      <div className="auth__content">
        <Link to="/" className="auth__logo-link">
          <img src={logo} alt="Логотип страницы" className="auth__logo" />
        </Link>
        <form action="" className="auth__form form">
          <h1 className="auth__title">{props.title}</h1>
          <label
            className={`${
              pathname === "/sign-up" ? "form__label" : "form__label_inactive"
            }`}
          >
            Имя
          </label>
          <input
            placeholder="Имя"
            name="name"
            type="text"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            className={`${
              pathname === "/sign-up" ? "form__input" : "form__input_inactive"
            }`}
          />
          <label htmlFor="" className="form__label">
            E-mail
          </label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            autoComplete="off"
            className="form__input"
          />
          <label htmlFor="" className="form__label">
            Пароль
          </label>
          <input
            type="password"
            className="form__input"
            placeholder="Пароль"
            required
            name="password"
          />
          <span
            className={`${
              pathname === "/sign-up" ? "form__error" : "form__error_inactive"
            }`}
          >
            Что-то пошло не так...
          </span>
          <button
            type="submit"
            className={`form__button ${
              pathname === "/sign-in" ? "form__button-enter" : ""
            }`}
          >
            {props.button}
          </button>
        </form>
        <div className="auth__container">
          <div className="auth__signed">{props.question}</div>
          <Link to={props.path} className="auth__link">
            {props.action}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;
