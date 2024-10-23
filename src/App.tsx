import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../src/screens/Home';
import { useNavigate } from 'react-router-dom';
import Registration from '../src/screens/RegistrationPage'
import AuthPage from '../src/screens/AuthPage';
import './App.css'
import ProjectPage from './screens/ProjectPage';
import PrivateRoute from './privateRoute/PrivateRoute';
import CreateProject from './components/Project/CreateProject';
import { IProject } from './interfaces';

function App() {
 
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/registration" element={<Registration />} />

        <Route 
        path="/projects" 
        element={
        <PrivateRoute> 
          <ProjectPage />
          </PrivateRoute>
        }
        />

      <Route 
        path="/projects/create" 
        element={
        <PrivateRoute> 
          <CreateProject/>
        </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
