import React, { useState } from 'react'
import { SendComment } from './comment'

// Функция для стилизации поста
export function FormatPost(props) {
  const {post, detail} = props
  function DetailLink() {
    window.location.href = `/${post.id}`
  }
  
  console.log(post)
  return <React.Fragment>
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