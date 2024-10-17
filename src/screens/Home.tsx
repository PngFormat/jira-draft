import React from 'react';
import { useNavigate } from 'react-router-dom';



function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>Добро пожаловать</h1>
    
      <div> 
      <br/>
      <button onClick={() => navigate('/login')}>Авторизация</button>
        <button>Регистрация</button>
      </div>
    </div>
  );
}

export default Home;
