import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

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
        <Route path='/login' element={<LoginPage addToken={addToken} addUser={addUser} />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<NavBar token={token} user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
