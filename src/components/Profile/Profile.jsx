import React, { useContext, useEffect } from 'react';
import './Profile.css';
import useFormValidation from '../../hooks/useFormValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Profile = ({ onUpdateUser, onSignOut, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, handleChange, isFormValid, resetForm } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isValueSameAsWas = (!isFormValid || (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email));

  return (
    <section className="profile">
      <form onSubmit={handleSubmit} className="profile__form form">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="form__content">
          <label htmlFor="" className="profile__label">
            Имя
          </label>
          <input
            className="profile__input"
            value={enteredValues.name || ""}
            type="text"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__content">
          <label htmlFor="" className="profile__label">
            E-mail
          </label>
          <input
            className="profile__input"
            value={enteredValues.email || ""}
            pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="profile__container">
            <button
              className='profile__button'
              type='submit'
              disabled={isValueSameAsWas}
            >
              Редактировать
            </button>
            <button
              className='profile__sign-link profile__exit-btn'
              type='button'
              onClick={() => onSignOut()}
            >
              Выйти из аккаунта
            </button>
        </div>
      </form>
    </section>
  )
};

export default Profile;



