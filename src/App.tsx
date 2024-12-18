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
import { ProjectDetailsPage } from './screens/ProjectDetailsPage';
import TaskDetailsPage from './screens/TaskDetailsPage.tsx';
import TaskCreatorPage from './screens/TaskCreatorPage';
import TaskEditorPage from './screens/TaskEditorPage';
import ProjectEditorHOC from './screens/ProjectEditorPage';
import CommentCreatorPage from './screens/CommentsCreatorPage';

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

        <Route 
        path="/projects/:id" 
        element={
        <PrivateRoute> 
          <ProjectDetailsPage/>
        </PrivateRoute>
        }
        />

        <Route 
        path="/projects/:id/tasks" 
        element={
        <PrivateRoute> 
          <TaskDetailsPage/>
        </PrivateRoute>
        }
        />

        <Route 
        path="/projects/:id/tasks/create" 
        element={
        <PrivateRoute> 
          <TaskCreatorPage/>
        </PrivateRoute>
        }
        />

      <Route 
        path="/projects/:projectId/tasks/edit/:id" 
          element={
          <PrivateRoute> 
            <TaskEditorPage />
          </PrivateRoute>
      }
        />

        <Route 
        path="/projects/:projectId/edit" 
          element={
          <PrivateRoute> 
            <ProjectEditorHOC/>
          </PrivateRoute>

          
      }
        />

      <Route 
        path="/projects/:projectId/tasks/:taskId/comments/create" 
          element={
          <PrivateRoute> 
            <CommentCreatorPage/>
          </PrivateRoute>

          
      }
        />    z
        
      </Routes>
    </Router>
  );
}


export default App;
