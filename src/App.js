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
import OneStore from './components/OneStore';

function App() {
  const [auth, setAuth] = useState(
    {
      token: window.sessionStorage.getItem('auth_token'),
      username: window.sessionStorage.getItem('auth_user'),
      role: window.sessionStorage.getItem('auth_role')
    }
  );
  function addAuth(auth) {
    setAuth(auth);
  }

  const [store, setStore] = useState();
  function addStore(stor) {
    setStore(stor);
  }
  return (
    <BrowserRouter className="App">
      <NavBar auth={auth} addAuth={addAuth} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage addAuth={addAuth} />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='merchants' element={<MerchantsPage auth={auth} />} />

        <Route path='merchants/:id' element={<OneMerchant auth={auth}/>} />
        <Route path='newMerchant' element={<OneMerchant auth={auth} />} />

        <Route path='stores/:id' element={<OneStore auth={auth} addStore={addStore} />} />
        <Route path='newStore' element={<OneStore auth={auth} />} />

        <Route path='stores' element={<StoresPage auth={auth} />} />
        <Route path='merchants/:id/stores' element={<StoresPage auth={auth} />} />


        {/* <Route path='stores/:id/agents' element={<StoresPage auth={auth} store={store} />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
