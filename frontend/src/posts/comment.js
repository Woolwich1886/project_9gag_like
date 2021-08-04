import React, { useEffect, useState } from "react";
import { BeData } from "./bedata"
export function SendComment(props) {
  const {post} = props
  const [commentText, setCommentText] = useState("");
  var data = {}
  var [comments, setCmnts] = useState([post.comments])
  useEffect (() => {
    setCmnts(post.comments)
  },[setCmnts, post.comments])
  function callback (response, status) {
    if (status===201) {
      console.log(status)
      setCmnts(response.comments)
    }
    else {
      console.log(status)
    }
  }
  const handleSubmit = (evt) => {
      evt.preventDefault();
      data=JSON.stringify({post: post.id, text: commentText})
      //alert(`Submitting Name ${commentText}`)
      BeData("POST", "http://localhost:8000/api/posts/send_comment", callback, {post: post.id, text: commentText})
      console.log(data)
      setCommentText("")
      console.log(props)
  }
  console.log("post-id", post.id)
  return (<React.Fragment>
      
    
     <div>
     { comments.map((item) => {
       return <CommentDesign ccc = {item} key={item.id} />})}</div>
       <form onSubmit={handleSubmit}>
       
       <textarea
        className="form-control"    
        resize="none"
        style={{weight: '100%', resize:"none"}}
        placeholder="оставьте комментарий здесь" 
        id="floatingTextarea2"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        required={true}
        maxLength='100'
        ></textarea>
     <button type='submit' className="btn btn-success" >Отправить</button>
     </form></React.Fragment>)
  
}




export function CommentDesign(props) {
  const {ccc} = props
  return <div>
      
      <div>{ccc.user}</div>
      <div>{ccc.text}</div>
      <div>{ccc.comment_date}</div>
    </div>
}
