import React, { useState, useEffect } from "react"
import { BeData } from "./bedata"
export function DelPostBtn (props) {
    const {postId} = props
    const [isDel, setIsDel] = useState(false)

    function handleDeletePost(event) {
        event.preventDefault()
        function callback(response, status){
            console.log(response, status)
        }
        if (window.confirm("Вы действительно хотите удалить пост?")) {
            setIsDel(true); BeData("DELETE", `http://localhost:8000/api/posts/${event.target.value}/delete/`, callback)}

        //BeData("DELETE", `http://localhost:8000/api/posts/${event.target.value}/delete/`, callback)
    }
    return <div>
        
    {isDel === false 
        ? <div> 
        <button type="button" id="btn" value={postId} onClick={handleDeletePost} className="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Удалить
        </button>
        
        </div>
            : <div>Пост удален</div>}
            
            
        </div>
        }


export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scorlled upto given distance
  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  // Set the top cordinate to 0
  // make scrolling smooth
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className=" col-2 bi bi-arrow-up-square-fill" style={{position: 'sticky', top: 50, marginLeft:"80%"}}>
      {isVisible && 
        <button className="btn btn-outline-info"onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 -2 20 20">
        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
      </svg>
           Наверх</button>}
    </div>
  );
}


export function DelCommBtn(props){
  const{comId} = props
  const [isDel, setIsDel] = useState(false)

    function handleDeleteComment(event) {
        event.preventDefault()
        function callback(response, status){
            console.log(response, status)
        }
        if (window.confirm("Вы действительно хотите удалить комментарий?")) {
            setIsDel(true); BeData("DELETE", `http://localhost:8000/api/comments/${event.target.value}/delete/`, callback)}

        //BeData("DELETE", `http://localhost:8000/api/posts/${event.target.value}/delete/`, callback)
    }
    return <div>
        
    {isDel === false 
        ? <div> 
        <button type="button" id="btn" value={comId} onClick={handleDeleteComment} className="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Удалить
        </button>
        </div>
            : <div>Комментарий удален</div>}
        </div>
        }
