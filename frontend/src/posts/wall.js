import React, { useState, useEffect } from "react"
import './wall.css';
export function Menubar() {
    const path = window.location.pathname.substring(1)
    const [catType, setCatType] = useState(path)
    console.log('catType is ', catType)
    console.log('path is', path)
    function handleSort(event){
        event.preventDefault()
        console.log(event.target.value)
        setCatType(event.target.value)
        console.log('btn value is ',event.target.value)
        console.log('category is ', catType)
        window.location.href=`/${event.target.value}`
    }

    return <React.Fragment>
        <div className="sticky-top sticky-offset">
        <hr class="m-3 border-3 border-top border-info"></hr>
        <div class="btn-group-vertical col-12" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" class="btn-check active" name="btnradio" id="btnradio1" value='' onChange={handleSort} checked={catType===''}></input>
            <label class="btn btn-outline-info text-start" for="btnradio1"><svg xmlns="http://www.w3.org/2000/svg" width="35%" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="20 0 16 16">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>Главная</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value='music' onChange={handleSort} checked={catType==='music'}></input>
            <label class="btn btn-outline-info text-start" for="btnradio2"><svg xmlns="http://www.w3.org/2000/svg" width="35%" height="16" fill="currentColor" class="bi bi-earbuds" viewBox="20 0 16 16">
            <path fill-rule="evenodd" d="M6.825 4.138c.596 2.141-.36 3.593-2.389 4.117a4.432 4.432 0 0 1-2.018.054c-.048-.01.9 2.778 1.522 4.61l.41 1.205a.52.52 0 0 1-.346.659l-.593.19a.548.548 0 0 1-.69-.34L.184 6.99c-.696-2.137.662-4.309 2.564-4.8 2.029-.523 3.402 0 4.076 1.948zm-.868 2.221c.43-.112.561-.993.292-1.969-.269-.975-.836-1.675-1.266-1.563-.43.112-.561.994-.292 1.969.269.975.836 1.675 1.266 1.563zm3.218-2.221c-.596 2.141.36 3.593 2.389 4.117a4.434 4.434 0 0 0 2.018.054c.048-.01-.9 2.778-1.522 4.61l-.41 1.205a.52.52 0 0 0 .346.659l.593.19c.289.092.6-.06.69-.34l2.536-7.643c.696-2.137-.662-4.309-2.564-4.8-2.029-.523-3.402 0-4.076 1.948zm.868 2.221c-.43-.112-.561-.993-.292-1.969.269-.975.836-1.675 1.266-1.563.43.112.561.994.292 1.969-.269.975-.836 1.675-1.266 1.563z"/>
            </svg>Муызка</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" value='serials' onChange={handleSort} checked={catType==='serials'}></input>
            <label class="btn btn-outline-info text-start" for="btnradio3"><svg xmlns="http://www.w3.org/2000/svg" width="35%" height="16" fill="currentColor" class="bi bi-tv-fill" viewBox="20 0 16 16">
            <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z"/>
            </svg>Сериалы</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" value='sport' onChange={handleSort} checked={catType==='sport'}></input>
            <label class="btn btn-outline-info text-start" for="btnradio4"><svg xmlns="http://www.w3.org/2000/svg" width="35%" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="20 0 16 16">
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
            </svg>Спорт</label>
            
            </div>
            <hr class="m-3 border-3 border-top border-info"></hr>
            <ScrollToTop />
            </div>
            </React.Fragment>
                }


function ScrollToTop() {
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
    <div className="bi bi-arrow-up-square-fill" style={{position: 'sticky'}}>
      {isVisible && 
        <button className="col-12 btn btn-outline-info"onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 -2 20 20">
        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
      </svg>
           Наверх</button>}
    </div>
  );
}
                
