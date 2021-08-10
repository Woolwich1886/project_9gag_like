import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { DetailPost, Menubar } from './posts';
import { ProfileView } from './profiles';



//const element = <Welcome name="Алиса" />;
//Когда React встречает подобный элемент, 
//он собирает все JSX-атрибуты и дочерние элементы в один объект 
//и передаёт их нашему компоненту. Этот объект называется «пропсы» (props).
const wallElement = document.getElementById('root')
if (wallElement) {
  ReactDOM.render(<App />, wallElement)
}

const e = React.createElement
const postElement = document.getElementById('detail')
if (postElement) {
  ReactDOM.render(
    e(DetailPost, postElement.dataset), postElement
  )
}

const profileElement = document.getElementById('profile')
if (profileElement) {
  ReactDOM.render(
    e(ProfileView, profileElement.dataset), profileElement
  )
}

const categoryElement = document.getElementById('category')
if (categoryElement) {
  ReactDOM.render(
    e(Menubar, categoryElement.dataset), categoryElement
  )
}







//  ReactDOM.render(
//    <React.StrictMode>
//    <App />
//    </React.StrictMode>,
//    document.getElementById('root') //корневой узел ДОМ
//  )



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
