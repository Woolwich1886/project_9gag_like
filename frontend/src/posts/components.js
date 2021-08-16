import React from 'react'
import { DelPostBtn, RateBtn } from './btns'
import { SendComment } from './comment'


// Функция для стилизации поста
export function FormatPost(props) {
  const {post, detail} = props
  console.log(post)
  return <React.Fragment>
    <div className=" mx-auto my-5 col-6 bg-light border border-dark shadow p-3 rounded position-relative">
    <header className="row" style={{position:'relative'}}>
      <div className="col position-relative">
    {detail === false
    ? <div><h2><a className="link-dark" href={`/posts/${post.id}/`} style={{textDecoration: 'none'}}>{post.title}</a></h2></div>
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
    <div><h6>Категория: {post.category}</h6></div>
    <hr class="border-3 border-top border-dark"></hr>
    <div className="text-center"><a href={`/posts/${post.id}/`}><img src={post.image_url} height="60%" width="60%" alt={post.title}></img></a></div>
    <hr class="border-3 border-top border-dark"></hr>
        <RateBtn post={post}/>
    <footer>
      <div><h6><a className="link-dark" href={`/profile/${post.user}/`}>Автор: {post.author}</a></h6></div>
      <div><h6>Дата публикации: {post.pub_date}</h6></div>
      <div><h6>Комментарии: {post.comments_quantity}</h6></div>
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
