import React, {useEffect, useState} from "react";
import { BeData } from "./bedata";
import {FormatPost} from "./components";


export function DetailPost() {
    var [postList, setPostList] = useState([])
    const path = window.location.pathname
    console.log(path)  
  useEffect(() => {
    function WallList(response, status) {
      setPostList(response)
    }
    BeData('GET', `http://localhost:8000/api/posts${path}`, WallList)
  }, [path])  
  function BackHome() {
        window.location.href = `/`
  }   
    return  <><button className="btn btn-primary" onClick={BackHome}>Назад</button>
    <FormatPost post={postList} detail={true} key={postList.id} /></>
}