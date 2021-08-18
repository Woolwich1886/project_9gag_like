import React, { useEffect, useState } from "react"
import { BeData, ListOfPosts } from "../posts/bedata"



export function ProfileView(props) {
    const { username, requestuser } = props

    var [isload, setIsload] = useState(false)
    var [profData, setProfData] = useState([])
    useEffect(() => {
        function ProfileLoad(response, status) {
            setProfData(response)
            setIsload(true)
        }
        BeData("GET", `profile/${username}`, ProfileLoad)
    }, [username])


    function handleCreate(event) {
        event.preventDefault()
        window.location.href = '/posts/create'
    }


    return <React.Fragment>{
        isload
            ? <>

                <div className="profile container-sm my-5 bg-white col-6 border border-dark rounded-3 border-2">

                    <div className="row p-3">
                        <div className="col-sm-4"><img className="border border-dark border-2" style={{ borderRadius: '50%' }} src={profData.badge_url} height="100%" width="100%" alt={profData.second_name}></img></div>
                        <div className="col-sm-8">
                            <div className="row h3"><p>{profData.first_name} {profData.second_name}</p></div>
                            <div className="row p-3">{profData.about}</div>
                        </div>
                    </div>
                </div>{requestuser === username
                    ?
                    <div className="text-center">
                        <a className="link-dark" href={`/posts/create/`}><button className="btn btn-success btn-lg" onClick={handleCreate}>+ Добавить пост</button></a>
                    </div>
                    : null}
                <div>
                    <ListOfPosts username={username} /></div>
            </>
            : null}
    </React.Fragment>
}








