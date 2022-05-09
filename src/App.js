import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import MerchantsPage from './components/MerchantsPage';
import HomePage from './components/HomePage';
import OneMerchant from './components/OneMerchant';
import NewMerchant from './components/NewMerchant';

function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem('auth_token'));
  function addToken(authToken) {
    setToken(authToken);
  }
  const [user, setUser] = useState(window.sessionStorage.getItem('auth_user'));
  function addUser(username) {
    setUser(username);
  }
  return (
    <BrowserRouter className="App">
      <NavBar token={token} user={user} addToken={addToken} addUser={addUser} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage addToken={addToken} addUser={addUser} />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='merchants' element={<MerchantsPage token={token} user={user} />} />
        <Route path='merchants/:id' element={<OneMerchant token={token} user={user} />} />
        <Route path='merchants/newMerchant' element={<NewMerchant token={token} user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
