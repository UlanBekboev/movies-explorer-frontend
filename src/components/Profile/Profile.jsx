import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <Header />
      <div className="profile__content">
        <form action="" className="profile__form form">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <div className="form__content">
            <label htmlFor="" className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              defaultValue="Виталий"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              required
            />
          </div>
          <div className="form__content">
            <label htmlFor="" className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              defaultValue="pochta@yandex.ru"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
        </form>
        <div className="profile__container">
          <button type="submit" className="profile__button">Редактировать</button>
          <Link to="/" className="profile__exit-btn">Выйти из аккаунта</Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;
