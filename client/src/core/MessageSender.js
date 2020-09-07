import React from 'react'
import './MessageSender.css'
import {Avatar} from '@material-ui/core'
import {isAuthenticated} from '../auth'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import PostModal from '../post/PostModal'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'

function MessageSender() {

   const handleSumbit = e => {
        e.preventDefault();
    }
    return (
        <div className = "messageSender">
            <div className = "messageSender__top">
            <Avatar src = {`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}?${new Date().getTime()}`}  onError={i =>
    (i.target.src = `${DefaultProfile}`)
} />
                <PostModal />
                {/* <input type = "text" onClick = {showModal} className = "messageSender__input"placeholder = {`Have something to sell, ${isAuthenticated().user.name}?`}/>
                <button onClick = {handleSumbit} type = "submit">Hidden Submit</button> */}
            </div>
            <div className = "messageSender__bottom">
                <div className = "messageSender__option">
                    <VideocamIcon style = {{color: "red"}}/>
                    <p>Live Video</p>
                </div>
                <div className = "messageSender__option">
                    <PhotoLibraryIcon style = {{color: "green"}}/>
                    <p>Photo/Video</p>
                </div>
                <div className = "messageSender__option">
                    <InsertEmoticonIcon style = {{color: "orange"}}/>
                    <p>Feeling/Activity</p>
                </div>
            </div>
            
        </div>
    )
}

export default MessageSender
