import React, { useEffect, useState } from "react"
import { BeData, ListOfPosts } from "../posts/bedata"
const path = window.location.pathname
    console.log(path)

export function ProfileView(props){
    const {username} = props
    var [isload, setIsload] = useState(false)
    var [profData, setProfData] = useState([])
    const path = window.location.pathname
    console.log(path)
    useEffect (() => {
        function ProfileLoad(response, status) {
            setProfData(response)
            setIsload(true)
        }
        BeData("GET", `http://localhost:8000/api/profile/${username}`, ProfileLoad)
    }, [username])
    return <React.Fragment>{
        isload
        ?<>
        <div className="container-sm my-5 w-50 border border-dark border-2">
        
        <div className="row p-3">
            <div className="col-sm-4"><img style={{borderRadius: '50%'}} src={profData.badge_url} height="100%" width="100%" alt={profData.second_name}></img></div>
            <div className="col-sm-8">
            <div className="row h3"><p>{profData.first_name} {profData.second_name}</p></div>
            
            <div className=" row">{profData.about}</div>
        </div>
        </div>
        
        </div>
        <div>
        <ListOfPosts username={username} /></div>
        </>
        : null}
    </React.Fragment>
}




    
 


