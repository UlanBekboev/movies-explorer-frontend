import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import { USER_REGEX } from "../../utils/constants";
import { EMAIL_REGEX } from "../../utils/constants";

function Profile({ handleUpdateUser, isLoading, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useFormValidation();
  const [isLastValues, setIsLastValues] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }

  return (
    <section className="profile">
      <div className="profile__content">
        <form
          id="form"
          className="profile__form form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="form__content">
            <label className="profile__label">Имя</label>
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder={currentUser.name}
              onChange={handleChange}
              value={enteredValues.name || ""}
              pattern={USER_REGEX}
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </div>
          <div className="form__content">
            <label className="profile__label">E-mail</label>
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              onChange={handleChange}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ""}
              placeholder={currentUser.email}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </div>
          <div className="profile__container">
            <button
              type="submit"
              disabled={!isFormValid ? true : false}
              className={
                !isFormValid || isLoading || isLastValues
                  ? "profile__button form__button-save_inactive"
                  : "profile__button"
              }
            >
              Редактировать
            </button>
            <button
              type="button"
              className="profile__sign-link profile__exit-btn"
              onClick={handleSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
