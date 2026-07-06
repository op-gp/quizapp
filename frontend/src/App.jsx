import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router';
import Navbar from "../components/Navbar.jsx";

const App = () => {
 return (
    <div className='bg-gray-800'>
      <Navbar />
    </div>
  );
}

export default App