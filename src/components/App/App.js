import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import './App.css';

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTool from "../InfoTool/InfoTool";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies
} from "../../utils/MainApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn])

  const handleRegistration = async ({ name, email, password }) => {
    return register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      
      .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        navigate('/movies', {replace: true});
        Promise.all([getContent(), getSavedMovies()])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          })
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };


  const handleSaveMovie = (movie) => {
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      saveMovie(movie)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
    }
  }

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    deleteMovie(movie._id)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Профиль успешно редактирован!');
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage('При обновлении профиля произошла ошибка.');
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate('/', {replace: true});;
  };

  const handleTokenCheck = () => {
    const path = location.pathname;
    const token = localStorage.getItem('userId');
    if (token) {
      getContent()
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        navigate(path, {replace: true});;
      })
      .catch((err) => console.log(err));
    getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => console.log(err));
    }
    
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path='/' element={
             <>
              <Header isLoggedIn={isLoggedIn}/>
              <Main isLoggedIn={isLoggedIn} />
              <Footer />
             </>
          } /> 
          
          <Route path="/movies" element={
            <>
              <Header isLoggedIn={isLoggedIn}/>
              <ProtectedRoute
                 component={Movies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                isLoading={isLoading}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
              <Footer />
            </>
          }/>
          <Route path="/saved-movies" element={
            <>
              <Header isLoggedIn={isLoggedIn}/>
              <ProtectedRoute
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
              <Footer />
            </>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute
              component={Profile}
              isLoggedIn={isLoggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={handleSignOut}
            />
          }/>
          <Route path="/sign-in" element={
            <Login onLogin={handleAuthorization} />
           } />          
          <Route exact path='/sign-up' element={
            <Register onRegister={handleRegistration} />
          } />
          <Route path="*" element={
            <PageNotFound />}>
          </Route>
        </Routes>
        <InfoTool
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
