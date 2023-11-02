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
        <form onSubmit={props.submit} disabled={props.isValid ? true : false} className="auth__form form">
          <h1 className="auth__title">{props.title}</h1>
          {props.nameInput}
          <label htmlFor="" className="form__label">
            E-mail
          </label>
          <input
            className="form__input"
            onChange={props.onEmailChange}
            placeholder="Email"
            pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$"
            name="email"
            type="email"
            value={props.email || ""}
            required
            autoComplete="off"
          />
          <label htmlFor="" className="form__label">
            Пароль
          </label>
          <input
            className="form__input"
            onChange={props.onPasswordChange}
            placeholder="Пароль"
            name="password"
            type="password"
            value={props.password || ""}
            minLength={8}
            maxLength={64}
            required
            autoComplete="off"
          />
          <span className="form__error">
            {props.error}
          </span>
          <button
            type="submit"
            className={`form__button ${
              pathname === "/sign-in" && "form__button-enter"
            } ${props.isValid ? "" : "form__button_disabled"}`}
          >
            {props.action}
          </button>
        </form>
        <div className="auth__container">
          <div className="auth__signed">{props.question}</div>
          <Link to={props.path} className="auth__link">
            {props.answer}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;
