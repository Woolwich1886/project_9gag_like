export function LoadPosts (callback) {
    const xhr = new XMLHttpRequest()
    const url = "http://localhost:8000/api"
    const method = "GET"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function(){
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        console.log(e)
        callback({"message": "request error"}, 400)
    }
    xhr.send()
  }