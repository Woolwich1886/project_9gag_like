import React, { useEffect, useState } from "react";
import { BeData } from "./bedata"


export function SendComment(props) {
  const {post} = props
  const [commentText, setCommentText] = useState("");
  const [sortType, setSortType] = useState('newest')
  var data = {}
  var [comments, setCmnts] = useState([post.comments])
  //console.log('sortType is', sortType)
  useEffect (() => {
    setCmnts(post.comments)
    console.log('on hook ', sortType)
  },[setCmnts, post.comments, sortType])
  
  function callback (response, status) {
    if (status===201 || status===200) {
      setCmnts(response.comments)
    }
    else { console.log(status, "Ошибка")
    }
  }
  function handleSubmit (evt) {
      evt.preventDefault();
      data={post: post.id, text: commentText, sortType: sortType}
      BeData("POST", "http://localhost:8000/api/posts/send_comment", callback, data)
      //console.log(data)
      setCommentText("")
      //console.log(sortType)
      //console.log(props)
  }

  function handleSort(event) {
    //event.preventDefault()
    setSortType(event.target.value)
    console.log('btn value is ',event.target.value)
    console.log('sortType is ', sortType)
    BeData("POST", `http://localhost:8000/api/posts/${post.id}/sort`, callback, {sortType: event.target.value})
  }


  function handleDeleteComment(event) {   
    console.log(event.target.value)
    alert("точно удалить?")
    BeData("DELETE", `http://localhost:8000/api/posts/${post.id}/${event.target.value}`, callback, {sortType: sortType})
  }

  return (<React.Fragment>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value='newest' onChange={handleSort} checked={sortType==='newest'}></input>
        <label className="btn btn-outline-primary" for="btnradio1">Сначала новые</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value='old' onChange={handleSort} checked={sortType==='old'}></input>
        <label className="btn btn-outline-primary" for="btnradio2">Сначала старые</label>
      </div>
     <div>
     { comments.map((item) => {
       return <React.Fragment key={item.id}>
       <div>{item.user}</div>
      <div>{item.text}</div>
      <div>{item.comment_date}</div>
      {item.my_comment
      ? <button className="btn btn-danger" value={item.id} onClick={handleDeleteComment}>удалить</button>
      : null}
      </React.Fragment>})}
       </div>
       <form onSubmit={handleSubmit}>
       <textarea
        className="form-control"    
        resize="none"
        style={{weight: '100%', resize:"none"}}
        placeholder="Оставьте комментарий здесь" 
        id="floatingTextarea2"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        required={true}
        maxLength='100'
        ></textarea>
     <button type='submit' className="btn btn-success" >Отправить</button>
     </form></React.Fragment>)  
}