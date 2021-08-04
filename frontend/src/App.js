import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import { ListOfPosts } from './posts'
import { DetailPost } from './posts'



const showTranslate = () => {
  if (window.location.pathname === "/") {
    return <ListOfPosts />
  }
}

const showSearch = () => {
  if (window.location.pathname.match(/\d+/)) {
    console.log(window.location.pathname, window.location.pathname.match(/\d+/))
    return <DetailPost />
  }
}

function App () {
  return (
    <>
      
      {showTranslate()}
      {showSearch()}
      
    </>
  )
}

//
//function App() {
//    
//  return (
//    <div className="App">
//      <ListOfPosts />
//      
//    </div>)
//  
//
//}
export default App;
//
