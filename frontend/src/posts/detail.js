import React, {useEffect, useState} from "react";
import { BeData } from "./bedata";
import {FormatPost} from "./components";


export function DetailPost() {
    var [postList, setPostList] = useState([])
    var [postIsLoad, setPostIsLoad] = useState(false)
    const path = window.location.pathname
    console.log(path)  
  useEffect(() => {
    function WallList(response, status) {
      setPostList(response)
      setPostIsLoad(true)
    }
    BeData('GET', `http://localhost:8000/api/posts${path}`, WallList)
  }, [path])   
    return  <React.Fragment>{postIsLoad ?
    <>
    <ScrollToTop />
    <button className="btn btn-primary" onClick={BackBtn}>Назад</button>
    <FormatPost post={postList} detail={true} key={postList.id} /></>
    : null} </React.Fragment>
}



function BackBtn () {
  window.history.back()
}


function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scorlled upto given distance
  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  // Set the top cordinate to 0
  // make scrolling smooth
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="bi bi-arrow-up-square-fill" style={{position: 'sticky', top: "10%", marginLeft: '80%'}}>
      {isVisible && 
        <button className="btn btn-outline-info"onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 -2 20 20">
        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
      </svg>
           Наверх</button>}
    </div>
  );
}

