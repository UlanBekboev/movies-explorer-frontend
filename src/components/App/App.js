import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Login from '../Login/Login';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const onLogin = () => {
    setisLoggedIn(true);
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
          <Movies />
        }/>
        <Route path="/saved-movies" element={
          <Movies />
        }/>
        <Route path="/profile" element={
          <Profile />
        }/>
        <Route path="/sign-in" element={
          <Login />
        }/>
        <Route path="/sign-up" element={
          <Register />
        }/>
        <Route path="*" element={
          <PageNotFound />}>
        </Route>
      </Routes>
      </CurrentUserContext.Provider>
      
    </div>
  );
}

export default App;
