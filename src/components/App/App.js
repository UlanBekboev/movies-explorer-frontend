import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [InfoTooltipPopup, setInfoToolTipPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const oninfoTooltip = () => {
    setInfoToolTipPopup(true);
  };

  useEffect(() => { // загрузка карточек с сервера
    if (loggedIn) {
      api.getSaveCards()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  useEffect(() => { // загрузка данных пользователя с сервера
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
          console.log(currentUser)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  // закрытие попапов
  function closePopups() {
    setMenuOpen(false);
    setIsSuccess(true);
    setInfoToolTipPopup(false);
  }

  //регистрация пользователя
  function handleRegisterSubmit({name, email, password}) {
    setIsLoading(true);
    const userData = api.register({name, email, password})
      .then(() => {
        if (userData) {
          handleLoginSubmit({email, password});
          setIsSuccess(true);
          oninfoTooltip();
          navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        oninfoTooltip();
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //авторизация пользователя
  function handleLoginSubmit({email, password}) {
    setIsLoading(true);
    const userData = api.login({email, password})
      .then(() => {
        if (userData) {
        setLoggedIn(true);
        setCurrentUser({ email, password })
        navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        oninfoTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function tokenCheck() {
    setIsLoading(true);
    api.getUserInfo()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate(location.pathname, { replace: true })
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //Проверка токена и авторизация пользователя
  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccess(true);
        oninfoTooltip();
      })
      .catch((err) => {
        setIsSuccess(false);
        oninfoTooltip();
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    api.logout()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleLikeClick(card, saved, setSaved) {
    if (!saved)
      api.postSaveCard(card)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
          setSaved(true);
        })
        .catch((err) => {
          console.log(err);
        })
  }

  function handleCardDelete(movie, setSaved) {
    const savedMovie = savedMovies.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    api.deleteSaveCard(savedMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== savedMovie._id));
        setSaved(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="app">
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path='/' element={
             <>
              <Header loggedIn={loggedIn}/>
              <Main loggedIn={loggedIn} />
              <Footer />
             </>
          } /> 
          
          <Route path="/movies" element={
            <>
              <Header loggedIn={loggedIn}/>
              <ProtectedRoute
                 element={Movies}
                 signOut={handleSignOut}
                 onUpdateUser={handleUpdateUser}
                 loggedIn={loggedIn}
                 closePopups={closePopups}
                 handleCardDelete={handleCardDelete}
                 isLoading={isLoading}
                 handleLikeClick={handleLikeClick}
                 savedMovies={savedMovies}
              />
              <Footer />
            </>
          }/>
          <Route path="/saved-movies" element={
            <>
              <Header loggedIn={loggedIn}/>
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                closePopups={closePopups}
                handleCardDelete={handleCardDelete}
                handleLikeClick={handleLikeClick}
                savedMovies={savedMovies}
              />
              <Footer />
            </>
          }/>
          <Route path="/profile" element={
            <>
            <Header loggedIn={loggedIn}/>
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              isSuccess={isSuccess}
              closePopups={closePopups}
              isLoading={isLoading}
              handleUpdateUser={handleUpdateUser}
              handleSignOut={handleSignOut}
            />
            </>
          }/>
          <Route path="/sign-in" element={
            <Login loggedIn={loggedIn}
            onLogin={handleLoginSubmit}
            isLoading={isLoading} />
           } />          
          <Route exact path='/sign-up' element={
            <Register onRegistr={handleRegisterSubmit}
            loggedIn={loggedIn}
            isLoading={isLoading} />
          } />
          <Route path="*" element={
            <PageNotFound />}>
          </Route>
        </Routes>
        <InfoTooltip
          onSuccess={isSuccess} onClose={closePopups} isOpen={InfoTooltipPopup}
        />
      </CurrentUserContext.Provider>)}
    </div>
  );
}

export default App;
