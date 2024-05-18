import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import Navbar from "./components/navbar.jsx";
import Landing from "./components/landing.jsx"

function App() {
  return(
    <>
 <BrowserRouter>
      <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Landing/>} />      
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );

}

export default App;
