import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const onLogin = () => {
    setisLoggedIn(true);
  }

  return (
    <div className="app">
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
            <Movies />
            <Footer />
          </>
        }/>
        <Route path="/saved-movies" element={
          <>
            <Header isLoggedIn={isLoggedIn}/>
            <Movies />
            <Footer />
          </>
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
    </div>
  );
}

export default App;
