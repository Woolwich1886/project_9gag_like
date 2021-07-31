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
    if (xhr.status === 200) {
      console.log(xhr.response, xhr.status)
      callback(xhr.response, xhr.status)
    } else {
      console.log('some error')
    }
  }
  xhr.onerror = function (e) {
    callback({"message": "Error"}, 400)
  }
  xhr.send(jsonData)
}


export function ListOfPosts() {
  var [post_list, set_post_list] = useState([])
  useEffect(() => {
    function WallList(response, status) {
      set_post_list(response)
    }
    BeData('GET', 'http://localhost:8000/api/posts', WallList)
  }, [])
  return post_list.map((item)=>{
    return <FormatPost post={item} key={item.id}/>
})

}

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