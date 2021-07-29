import React, {useState} from "react"


export function ActionBtn(props) {
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleActionBackendEvent = (response, status) =>{
      console.log(response, status)
      if (status === 200){
        setLikes(response.likes)
        // setUserLike(true)
      }
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id, action.type, handleActionBackendEvent)
      
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
  }
  
export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action}
    backendLookup("POST", "/tweets/action/", callback, data)
  }
  
  
  
  
export function backendLookup(method, endpoint, callback, data) {
    let jsonData;
    if (data){
      jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
    xhr.responseType = "json"
    const csrftoken = getCookie('csrftoken');
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
  
    if (csrftoken){
      xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }
    
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send(jsonData)
  }
  
   
  
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  
  
  
  
  
  
  
  
  
  
  
  