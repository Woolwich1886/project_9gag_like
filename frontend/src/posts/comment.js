import React, { useEffect, useState } from "react";
import { ProfPic } from "../profiles/pic";
import { BeData } from "./bedata"
import { DelCommBtn } from "./btns";
import './wall.css';

// детальный вид и комментарии
export function SendComment(props) {
  const { post } = props
  const [commentText, setCommentText] = useState("");
  const [sortType, setSortType] = useState('newest')
  var data = {}
  var [comments, setCmnts] = useState([post.comments])
  useEffect(() => {
    setCmnts(post.comments)
    console.log('on hook ', sortType)
  }, [setCmnts, post.comments, sortType])

  function callback(response, status) {
    if (status === 201 || status === 200) {
      setCmnts(response.comments)
    }
    else {
      console.log(status, "Ошибка")
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    data = { post: post.id, text: commentText, sortType: sortType }
    BeData("POST", "posts/send_comment", callback, data)
    setCommentText("")
  }

  function handleSort(event) {
    event.preventDefault()
    setSortType(event.target.value)
    console.log('btn value is ', event.target.value)
    console.log('sortType is ', sortType)
    BeData("POST", `posts/${post.id}/sort`, callback, { sortType: event.target.value })
  }

  return (<React.Fragment>
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" className="btn-check" name="btnradio" id="new" value='newest' onChange={handleSort} checked={sortType === 'newest'}></input>
      <label className="btn btn-outline-primary btn-sm" for="new">Сначала новые</label>
      <input type="radio" className="btn-check" name="btnradio" id="old" value='old' onChange={handleSort} checked={sortType === 'old'}></input>
      <label className="btn btn-outline-primary btn-sm" for="old">Сначала старые</label>
    </div>
    <div>
      {comments.map((item) => {
        return <div className="my-2 border border-dark rounded-3 p-2" key={item.id}>
          <div className="row">
            <div className="col-2">
              {item.user !== undefined ? <a href={`/profile/${item.user}/`}><ProfPic user={item.user} /></a> : null}</div>
            <div className="col-10">
              <div className="row">
                <div className="col"><h6><a className="link-dark" href={`/profile/${item.user}/`}>{item.author}</a></h6></div>
                <div className="col d-flex align-items-end flex-column">
                  {item.my_comment
                    ? <DelCommBtn comId={item.id} />
                    : null}
                </div>
              </div>
              <hr></hr>
              <div>{item.text}</div>
              <div className="text-muted"><em>{item.comment_date}</em></div>
            </div>
          </div>
        </div>
      })}
    </div>
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control"
        resize="none"
        style={{ widtht: '100%', resize: "none" }}
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