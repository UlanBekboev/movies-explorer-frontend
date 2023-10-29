import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <section className="profile">
      <Header />
      <div className="profile__content">
        <form action="" className="profile__form form">
          <h1 className="profile__title">
            Привет, Виталий!
          </h1>
          <div className="form__content">
            <label htmlFor="" className="profile__label">
              Имя
            </label>
            <input type="text" className="profile__input" placeholder='pochta@yandex.ru'/>
          </div>
          <div className="form__content">
            <label htmlFor="" className="profile__label">
              E-mail
            </label>
            <input type="text" className="profile__input" placeholder='Виталий'/>
          </div>
          
        </form>
        <div className="profile__container">
          <div className="profile__button">Редактировать</div>
          <div className="profile__exit-btn">Выйти из аккаунта</div>
        </div>
      </div>   
   </section>
  )
}

export default Profile;