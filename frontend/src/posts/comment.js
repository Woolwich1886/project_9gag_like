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
      setCommentText("")
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
    BeData("DELETE", `http://localhost:8000/api/posts/${post.id}/${event.target.value}`, callback, {sortType: sortType})
  }

  return (<React.Fragment>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value='newest' onChange={handleSort} checked={sortType==='newest'}></input>
        <label className="btn btn-outline-primary btn-sm" for="btnradio1">Сначала новые</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value='old' onChange={handleSort} checked={sortType==='old'}></input>
        <label className="btn btn-outline-primary btn-sm" for="btnradio2">Сначала старые</label>
      </div>
     <div>
     { comments.map((item) => {
       return <div className="my-2 border border-dark rounded-3 p-2" key={item.id}>
       <div>{item.author}</div>
       <hr></hr>
      <div>{item.text}</div>
      <div className="row my-2 text-muted" ><div className="col-9"><em>{item.comment_date}</em></div>
      {item.my_comment
      ?<div className="col-3"> <button className="btn btn-danger btn-sm" value={item.id} onClick={handleDeleteComment}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>удалить</button></div>
      : null}
      </div>
      </div>})}
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