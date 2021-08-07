import React, {useEffect, useState} from 'react'
import {FormatPost} from './components';

export function BeData(method, url, callback, data) {
  var jsonData
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open(method, url)
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


export function ListOfPosts(props) {
  const {username} = props
  var [postList, setPostList] = useState([])
  var [nextUrl, setNextUrl] = useState(null)
  console.log(postList)
  useEffect(() => {
    function WallList(response, status) {
      setNextUrl(response.next)
      setPostList(response.results)
    }
    username ? BeData('GET', `http://localhost:8000/api/posts/?username=${username}`, WallList)
    : BeData('GET', 'http://localhost:8000/api/posts', WallList)
  }, [username])
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
    return <React.Fragment>{ postList.map((item)=>{
      return <FormatPost post={item} detail = {false} key={item.id}/>
  })}
  {nextUrl !== null && <button className="btn btn-primary" onClick={NewPartOfPosts}>Загрузить еще</button>}</React.Fragment>}
  
  

//
//
//
//import React, {useEffect, useState} from 'react'
//import {FormatPost} from './components';
//export function ListOfPosts(props){
//  const {url} = props
//  var [post_list, set_post_list] = useState([]);
//  useEffect(() => {
//  const xhr = new XMLHttpRequest()
//  xhr.responseType = 'json'
//  xhr.open('GET', url)
//  xhr.onload = function() {
//    if (xhr.status === 200) {
//      console.log (xhr.response, xhr.status)
//      set_post_list(xhr.response)
//    }else{
//      console.log('sorry')
//    }
//  }
//  xhr.send()
//  }, [url])
//  
//  return post_list.map((item, index)=>{
//    return <FormatPost post={item} key={item.id}/>
//  })
//     
//    
// }
//