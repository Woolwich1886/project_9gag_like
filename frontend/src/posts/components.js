import React, { useState } from 'react'
import { BeData } from './bedata'
import { DelPostBtn } from './btns'
import { SendComment } from './comment'
// Функция для стилизации поста
export function FormatPost(props) {
  const {post, detail} = props
  function DetailLink() {
    window.location.href = `/posts/${post.id}/`
  }
  function ProfileLink() {
    window.location.href = `/profile/${post.user}/`
  } 

  console.log(post)
  return <React.Fragment>
    <div className="mx-auto my-3 col-6 bg-light border border-dark shadow p-3 mb-5 rounded">
    <header className="row">
      <div className="col-10">
    {detail === false
    ? <div className="h2" onClick={DetailLink}>{post.title}</div>
    : <div className="h2">{post.title}</div>
    }
    </div>
    {post.my_post
    ? console.log('post is', post.id)
    :null}
    {post.my_post 
      ? <DelPostBtn postId={post.id} />
      : null}
      </header>
    <div>Категория: {post.category}</div>
    <hr class="border-3 border-top border-dark"></hr>
    <div className="text-center"><img src={post.image_url} height="60%" width="60%" alt={post.title}></img></div>
    <hr class="border-3 border-top border-dark"></hr>
        <NormBtn post={post}/>
    
    <footer>
      <div onClick={ProfileLink}>Автор: {post.author}</div>
      <div>Дата публикации: {post.pub_date}</div>
      <div>Комментарии: {post.comments_quantity}</div>
    </footer>
    <div>
    {detail === true
    ? <SendComment post = {post} key={post.id} />
    : null
  }
    </div>
  </div>
  
  </React.Fragment>
}





function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
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
   const csrftoken = getCookie('csrftoken');
    if (csrftoken){
      //xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }
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
    
    <button className={BtnUpStyle} onClick={() => 
      didclickUp === false ? RateVal('upvote') : RateVal('delupvote') }><svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
      <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
    </svg>{upvotes}</button>
    <button className={BtnDownStyle} onClick={() => 
      didclickDown === false ? RateVal('downvote') : RateVal('deldownvote') }><svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
      <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
    </svg>{downvotes}</button>
    </React.Fragment>
  )
}
