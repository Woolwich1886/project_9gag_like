import React, {useEffect, useState} from 'react'
import {FormatPost} from './components';

export function BeData(method, url, callback, data) {
  var jsonData
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  const csrftoken = getCookie('csrftoken');
  //xhr.open(method, `http://localhost:8000/api/${url}`)
  xhr.open(method, `https://social-soc1.herokuapp.com/api/${url}`)
  if (csrftoken){
    //xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)}
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      callback(xhr.response, xhr.status)
    } else {
      console.log('some error', xhr.status, xhr.response)
    }
  }
  xhr.onerror = function (e) {
    callback({"message": "Error"}, 400)
  }
  xhr.send(jsonData)
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


export function ListOfPosts(props) {
  const {username, category} = props
  var [postList, setPostList] = useState([])
  var [nextUrl, setNextUrl] = useState(null)
  console.log(postList)
  useEffect(() => {
    function WallList(response, status) {
      setNextUrl(response.next)
      setPostList(response.results)
    }
    if (username) {
      BeData('GET', `posts/?username=${username}`, WallList)
    } else if (category) {
      BeData('GET', `posts/?category=${category}`, WallList)
    } else {
      BeData('GET', 'posts', WallList)
    }
  }, [username, category])
  function NewPartOfPosts() {
    if (nextUrl !== null) {
      function PartOfPosts(response, status) {
        if (status === 200) {
        setNextUrl(response.next)
        const newPosts = [...postList].concat(response.results)
        setPostList(newPosts)}
        else{
          alert("Ошибка при загрузке")
        }
      }
      BeData("GET", nextUrl, PartOfPosts)
    }
    }
    if (postList.length === 0) {
      return <div className="mx-auto my-5 col-6 bg-light border border-dark shadow p-3 rounded position-relative"><h3>Пока что постов нет</h3></div>
    }
    else {
    return <React.Fragment>{ postList.map((item)=>{
      return <FormatPost post={item} detail = {false} key={item.id}/>
  })}
  {nextUrl !== null && <div className="text-center"><button className="btn btn-success" onClick={NewPartOfPosts}>Загрузить еще</button></div>}</React.Fragment>}}
  

