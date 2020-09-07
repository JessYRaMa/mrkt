import React from 'react'
import './MessageSender.css'
import {Avatar} from '@material-ui/core'
import {isAuthenticated} from '../auth'
import DescriptionIcon from '@material-ui/icons/Description';
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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
            </div>
            <div className = "messageSender__bottom">
                <div className = "messageSender__option">
                    <DescriptionIcon style = {{color: "red"}}/>
                    <p>Description</p>
                </div>
                <div className = "messageSender__option">
                    <PhotoLibraryIcon style = {{color: "green"}}/>
                    <p>Photo/Video</p>
                </div>
                <div className = "messageSender__option">
                    <MonetizationOnIcon style = {{color: "orange"}}/>
                    <p>Price/Quantity</p>
                </div>
            </div>
            
        </div>
    )
}

export default MessageSender
