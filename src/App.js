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

function App() {
  const [token, setToken] = useState();
  function addToken(authToken) {
    setToken(authToken);
  }
  const [user, setUser] = useState();
  function addUser(username) {
    setUser(username);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/' element={<NavBar token={token} user={user} addToken={addToken} addUser={addUser} />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage addToken={addToken} addUser={addUser} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='merchants' element={<MerchantsPage />} />
          <Route path='merchants/:id' element={<OneMerchant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
