import React from 'react'
import { DelPostBtn, RateBtn } from './btns'
import { SendComment } from './comment'


// Функция для стилизации поста
export function FormatPost(props) {
  const {post, detail} = props
  console.log(post)
  function handleCategory(category) {
    const cats = {'music': 'Музыка', 'serials': 'Сериалы', 'sport': 'Спорт'}
    return cats[category]}
  return <React.Fragment>
    <div className=" mx-auto my-5 col-6 bg-light border border-dark shadow p-3 rounded">
    <header className="row">
      <div className="col position-relative">
    {detail === false
    ? <div><h2><a className="link-dark" href={`/posts/${post.id}/`} style={{textDecoration: 'none'}}target = "_blank" rel = "noopener noreferrer">{post.title}</a></h2></div>
    : <div className="h2">{post.title}</div>
    }
    </div>
    <div className="col d-flex align-items-end flex-column">
    {post.my_post
    ? console.log('post is', post.id)
    :null}
    {post.my_post 
      ? <DelPostBtn postId={post.id} />
      : null}
      </div>
      </header>
    <div><h6>Категория: {handleCategory(post.category)}</h6></div>
    <hr class="border-3 border-top border-dark"></hr>
    <div className="text-center"><a href={`/posts/${post.id}/`} target = "_blank" rel = "noopener noreferrer"><img src={post.image_url} height="60%" width="60%" alt={post.title}></img></a></div>
    <hr class="border-3 border-top border-dark"></hr>
        <RateBtn post={post}/>
        {detail === false ?
        <a href={`/posts/${post.id}/`} target = "_blank" rel = "noopener noreferrer"><button className="btn btn-secondary mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-dots-fill mx-1" viewBox="0 0 16 16">
  <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg> {post.comments_quantity}</button></a> : null}
    <footer>
      <div><h6><a className="link-dark" href={`/profile/${post.user}/`}target = "_blank" rel = "noopener noreferrer">Автор: {post.author}</a></h6></div>
      <div><h6>Дата публикации: {post.pub_date}</h6></div>
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
