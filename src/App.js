import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MerchantsPage from './components/MerchantsPage';
import HomePage from './components/HomePage';
import OneMerchant from './components/OneMerchant';
import StoresPage from './components/StoresPage';
import OneStore from './components/OneStore';
import { Wrapper } from "@googlemaps/react-wrapper";
import AgentsPage from './components/AgentsPage';
import AgentProfile from './components/AgentProfile';
import Footer from './components/Footer';
import { useState } from "react";
import AllMerchantsMap from './components/AllMerchantsMap';

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



  return (
    <div id="page-container">
      <div id="content-wrap">
        <BrowserRouter className="App">
          <NavBar auth={auth} addAuth={addAuth} />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path='login' element={<LoginPage addAuth={addAuth} />} />
            <Route path='register' element={<RegisterPage />} />

            <Route path='merchants' element={<MerchantsPage auth={auth} />} />

            <Route path='merchants/:id' element={<OneMerchant auth={auth} />} />
            <Route path='newMerchant' element={<OneMerchant auth={auth} />} />

            <Route path='stores' element={<StoresPage auth={auth} />} />

            <Route path='stores/:id' element={<OneStore auth={auth} />} />
            <Route path='newStore' element={<OneStore auth={auth} />} />
            <Route path='merchants/:id/stores' element={<StoresPage auth={auth} />} />

            <Route path='agents' element={<AgentsPage auth={auth} />} />

            <Route path='agents/:id' element={<AgentProfile auth={auth} />} />
            <Route path='newAgent' element={<AgentProfile auth={auth} />} />
            <Route path='stores/:id/agents' element={<AgentsPage auth={auth} />} />


            <Route path='merchantsMap' element={<Wrapper apiKey="AIzaSyDAyX4pd5h-Rdl7UKR5p58cBGxe9puCi6Q"><AllMerchantsMap auth={auth} /></Wrapper>} />


          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div></div>
  );
}

export default App;
