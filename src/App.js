import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [token, setToken] = useState();
  function addToken(authToken) {
    setToken(authToken);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
