import React, {useEffect, useState} from "react";
import { BeData } from "./bedata";
import {FormatPost} from "./components";
import { ScrollToTop } from "./btns";

export function DetailPost(props) {
    const {postid} = props
    console.log(postid)
    var [postList, setPostList] = useState([])
    var [postIsLoad, setPostIsLoad] = useState(false)
  useEffect(() => {
    function WallList(response, status) {
      setPostList(response)
      setPostIsLoad(true)
    }
    BeData('GET', `http://localhost:8000/api/posts/${postid}`, WallList)
  }, [postid])   
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


