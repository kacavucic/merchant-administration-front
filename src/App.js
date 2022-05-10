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
import StoresPage from './components/StoresPage';

function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem('auth_token'));
  function addToken(authToken) {
    setToken(authToken);
  }
  const [user, setUser] = useState(window.sessionStorage.getItem('auth_user'));
  function addUser(username) {
    setUser(username);
  }
  const [merchant, setMerchant] = useState();
  function addMerchant(merch) {
    setMerchant(merch);
  }
  return (
    <BrowserRouter className="App">
      <NavBar token={token} user={user} addToken={addToken} addUser={addUser} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage addToken={addToken} addUser={addUser} />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='merchants' element={<MerchantsPage token={token} />} />

        <Route path='merchants/:id' element={<OneMerchant token={token} addMerchant={addMerchant} />} />
        <Route path='newMerchant' element={<OneMerchant token={token} />} />

        <Route path='stores' element={<StoresPage token={token} />} />
        <Route path='merchants/:id/stores' element={<StoresPage token={token} merchant={merchant} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
