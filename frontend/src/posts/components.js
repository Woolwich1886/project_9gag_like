import React, { useEffect, useState } from 'react'
import { SendComment } from './comment'

// Функция для стилизации поста
export function FormatPost(props) {
  const {post, detail} = props
  function DetailLink() {
    window.location.href = `/${post.id}`
  }
  
  console.log(post)
  return <React.Fragment>
    <ScrollToTop />
    <div className="container my-5 w-50 border border-dark">
    {detail === false
    ? <header className="h2" onClick={DetailLink}>{post.title}</header>
    : <header className="h2">{post.title}</header>
    }
    <div>Категория: {post.category}</div>
    <div className="text-center"><img src={post.image_url} height="60%" width="60%" alt={post.title}></img></div>
        <NormBtn post={post}/>
    <div>{detail === true ? <div>asdasd</div> : ''}</div>
    <footer>
      <div>Автор: {post.author}</div>
      <div>Дата публикации: {post.pub_date}</div>
      <div>Комментарии: {post.comments_quantity}</div>
    </footer>
    <div>
    {detail === true
    ? <SendComment post = {post} key={post.id} />
    : <div>{post.comments_quantity}</div>
  }
    </div>
  </div>
  
  </React.Fragment>
}


export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
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









//Кнопки для голосов
export function NormBtn(props) {
  const {post} = props
  var [upvotes, setUpvotes] = useState(post.upvotes)
  var [downvotes, setDownvotes] = useState(post.downvotes)
  var [rate, setRate] = useState(post.rating)
  var [didclickUp, setDidclickUp] = useState(post.vote === "UP" ? true : false)
  var [didclickDown, setDidclickDown] = useState(post.vote === "DOWN" ? true : false)
  
  
  var BtnUpStyle = didclickUp === false ? "btn btn-outline-primary" : "btn btn-primary"
  var BtnDownStyle = didclickDown === false ? "btn btn-outline-danger" : "btn btn-danger"
  
  
  function RateVal (action) {
    const data = JSON.stringify({id: post.id, vote_type: action})
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST', 'http://localhost:8000/api/post/rate/')
    xhr.setRequestHeader("Content-Type", "application/json")
   //const csrftoken = getCookie('csrftoken');
   // if (csrftoken){
   //   // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
   //   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
   //   xhr.setRequestHeader("X-CSRFToken", csrftoken)
   // }
    if (action === 'upvote') {
    xhr.onload = function(ChangeRate) {
      if (xhr.status === 200) {
        console.log (xhr.response, xhr.status, xhr.response.rating)
        setDidclickUp(true)
        setRate(xhr.response.rating)
        setUpvotes(xhr.response.upvotes)
        setDidclickDown(false)
        setDownvotes(xhr.response.downvotes)  
         
      }else{
          console.log('sorry')        
      }
    }
    xhr.send(data)
  }else if (action === 'downvote'){
    xhr.onload = function(ChangeRate) {
      if (xhr.status === 200) {
        console.log (xhr.response, xhr.status, xhr.response.rating)
        setDidclickDown(true)
        setRate(xhr.response.rating)
        setUpvotes(xhr.response.upvotes) 
        setDidclickUp(false) 
        setDownvotes(xhr.response.downvotes)    
      }else{
          console.log('sorry')        
      }
    }
    xhr.send(data)
  }else if (action === 'delupvote'){
    xhr.onload = function(ChangeRate) {
      if (xhr.status === 200) {
        console.log (xhr.response, xhr.status, xhr.response.rating)
        setDidclickUp(false)
        setRate(xhr.response.rating)
        setUpvotes(xhr.response.upvotes) 
        setDownvotes(xhr.response.downvotes)      
      }else{
          console.log('sorry')        
      }
    }
    xhr.send(data)
  }else if (action === 'deldownvote'){
    xhr.onload = function(ChangeRate) {
      if (xhr.status === 200) {
        console.log (xhr.response, xhr.status, xhr.response.rating)
        setDidclickDown(false)
        setRate(xhr.response.rating)
        setDownvotes(xhr.response.downvotes)   
        setUpvotes(xhr.response.upvotes)  
      }else{
          console.log('sorry')        
      }
    }
    xhr.send(data)
  }
  }
  return (<React.Fragment>
    {rate}
    <button className={BtnUpStyle} onClick={() => 
      didclickUp === false ? RateVal('upvote') : RateVal('delupvote') }>{upvotes} Апвоут</button>
    <button className={BtnDownStyle} onClick={() => 
      didclickDown === false ? RateVal('downvote') : RateVal('deldownvote') }>{downvotes} Даунвоут</button>
    </React.Fragment>
  )
}



//function getCookie(name) {
//  var cookieValue = null;
//  if (document.cookie && document.cookie !== '') {
//      var cookies = document.cookie.split(';');
//      for (var i = 0; i < cookies.length; i++) {
//          var cookie = cookies[i].trim();
//          // Does this cookie string begin with the name we want?
//          if (cookie.substring(0, name.length + 1) === (name + '=')) {
//              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//              break;
//          }
//      }
//  }
//  return cookieValue;
//}