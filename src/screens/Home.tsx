import React from 'react';
import { useNavigate } from 'react-router-dom';

localStorage.removeItem('user')

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>Добро пожаловать</h1>
    
      <div> 
      <br/>
      <button onClick={() => navigate('/login')}>Авторизация</button>
        <button onClick={() => navigate('/registration')}>Регистрация</button>
      </div>
    </div>
  );
}

export default Home;
