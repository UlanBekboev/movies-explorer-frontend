import React from 'react';
import './App.css';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import InfoTooltip from "../InfoTool/InfoTool"; 

import {
  UNAUTHORIZED_ERROR,
  BAG_REQUEST_ERROR,
  UNAUTHORIZED_LOGIN,
  BAG_REQUEST_LOGIN,
  CONFLICT_ERROR,
  OK_STATUS_PROFILE,
  OK_STATUS_REGISTER,
  CONFLICT_REGISTER,
  INTERNAL_SERVER,
  INTERNAL_SERVER_ERROR,
} from "../../utils/constants";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  React.useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
      mainApi
        .getContent()
        .then((res) => {
          if (res) {
            setisLoggedIn(true);
            //localStorage.removeItem("movies");
          } else {
            setisLoggedIn(false);
          }
          navigate(path);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleRegisterSubmit(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        setIsOpenPopup(true);
        setStatus(OK_STATUS_REGISTER);
        handleLoginSubmit(email, password);
      })
      .catch((err) => {
        setIsOpenPopup(true);
        err === BAG_REQUEST_ERROR && setStatus(UNAUTHORIZED_LOGIN);
        err === CONFLICT_ERROR && setStatus(CONFLICT_REGISTER);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLoginSubmit(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        setisLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setIsOpenPopup(true);
        err === UNAUTHORIZED_ERROR && setStatus(UNAUTHORIZED_LOGIN);
        err === BAG_REQUEST_ERROR && setStatus(BAG_REQUEST_LOGIN);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser({ name, email }) {
    mainApi
      .updateUserInfo({ name, email })
      .then((data) => {
        setCurrentUser(data);
        setIsOpenPopup(true);
        setStatus(OK_STATUS_PROFILE);
      })
      .catch((err) => {
        setIsOpenPopup(true);
        err === INTERNAL_SERVER_ERROR && setStatus(INTERNAL_SERVER);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleMovieLike(card) {
    mainApi
      .postSavedMovie(card)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleMovieDelete(card) {
    mainApi
      .deleteSavedMovie(card._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOutSubmit() {
    localStorage.removeItem("userId");
    localStorage.removeItem("moviesList");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("movies");
    setisLoggedIn(false);
    navigate("/");
  }

  function closePopup() {
    setIsOpenPopup(false);
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={
            <>
              <Header isLoggedIn={isLoggedIn}/> 
              <Main />
              <Footer />
            </>
          }/>
          <Route path="/movies" element={
            <>
              <Header isLoggedIn={isLoggedIn}/>
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onMovieDelete={handleMovieDelete}
                handleMovieLike={handleMovieLike}
              />
              <Footer />
            </>
          }/>
          <Route path="/saved-movies" element={
            <>
              <Header isLoggedIn={isLoggedIn}/>
              <ProtectedRoute
                element={savedMovies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onMovieDelete={handleMovieDelete}
              />
              <Footer />
            </>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              onOpenPopup={setIsOpenPopup}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOutSubmit}
            />
          }/>
          <Route path="/sign-in" element={
            <Login 
            onLogin={handleLoginSubmit} isLoggedIn={isLoggedIn}/>
          }/>
          <Route path="/sign-up" element={
            <Register
              isLoggedIn={isLoggedIn}
              onRegister={handleRegisterSubmit}
              onSignOut={setIsOpenPopup}
            />
          }/>
          <Route path="*" element={
            <PageNotFound />}>
          </Route>
        </Routes>
        <InfoTooltip text={status} isOpen={isOpenPopup} onClose={closePopup} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
