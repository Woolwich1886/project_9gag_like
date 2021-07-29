import React, {useEffect, useState} from 'react'

export function ListOfPosts(){
  var [post_list, set_post_list] = useState([]);
  useEffect(() => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open('GET', 'http://localhost:8000/api/posts')
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log (xhr.response, xhr.status)
      set_post_list(xhr.response)
    }else{
      console.log('sorry')
    }
  }
  xhr.send()
  }, [])
  
  return post_list.map((item, index)=>{
    return <FormatPost post={item} key={item.id}/>
  })
     
    
 }
// Функция для стилизации поста
export function FormatPost(props) {
  const {post} = props
  console.log(post.title)
  return <div className="container my-5 w-50 border border-dark">
    <header className="h2">{post.title}</header>
    <div>Категория: {post.category}</div>
    <div className="text-center"><img src={post.image_url} height="60%" width="60%" alt={post.title}></img></div>
    <div>Рэйтинг {post.rating}
      <div>
        <RateBtn styleBtn="btn btn-primary" rateChoice={post.upvotes} post={post} action='upvote'/>
        <RateBtn styleBtn="btn btn-danger" rateChoice={post.downvotes} post={post} action='downvote'/>
      </div>
    </div>
    <footer>
    <div>Автор: {post.author}</div>
    <div>Дата публикации: {post.pub_date}</div>
    </footer>
  </div>
}

//функция для рейтинга
export function RateBtn (props) {
  const {post, action, styleBtn, rateChoice} = props
  const data = JSON.stringify({id: post.id, vote_type: action})
  var [rate, setRate] = useState(rateChoice)
  function RateVal () {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST', 'http://localhost:8000/api/post/rate/')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log (xhr.response, xhr.status)
        setRate(xhr.response.upvotes)
      }else{
          console.log('sorry')
        
      }
    }
    xhr.send(data)
  }
  return (
    
    <button className={styleBtn} onClick={() => RateVal()}>{rate} {action}</button>
  )
}



function UpvoteAlready(props) {
  const {post, data} = props


}