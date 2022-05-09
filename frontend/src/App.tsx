import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function AppWrapper() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/register' element={<Register />} />
        <Route path='/account/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
