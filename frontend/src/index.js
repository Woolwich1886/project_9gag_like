import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';


//const element = <Welcome name="Алиса" />;
//Когда React встречает подобный элемент, 
//он собирает все JSX-атрибуты и дочерние элементы в один объект 
//и передаёт их нашему компоненту. Этот объект называется «пропсы» (props).

 

  ReactDOM.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    document.getElementById('root') //корневой узел ДОМ
  )


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
