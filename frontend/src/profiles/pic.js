import { useEffect, useState } from 'react'
import { BeData } from '../posts/bedata'

export function ProfPic(props){
    const {user} = props
    console.log(user)
    const [picture, setPicture] = useState(null)
    useEffect(() => {
        function callback(response, status){
            console.log(response.badge_url, status, `api/profile/${user}/badge/`)
            setPicture(response.badge_url)
        }
        if (user!==undefined) {
            BeData("GET", `profile/${user}/badge/`, callback)}
    }, [user])
    
    
    return <>{user!==undefined
        ? <div style={{height: '100px'}}><img style={{borderRadius: '50%'}} src={picture} alt={user} height='75px' widtht="100%"></img></div>
        : <div>b</div>}</>
    
}