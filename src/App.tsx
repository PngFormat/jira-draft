import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../src/screens/Home';
import { useNavigate } from 'react-router-dom';
import Registration from '../src/screens/RegistrationPage'
import AuthPage from '../src/screens/AuthPage';
import './App.css'
import ProjectPage from './screens/ProjectPage';


function App() {

  return (
   <Router>
      <nav className='App'>
      
      </nav>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/projects" element={<ProjectPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
