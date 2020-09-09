import React from 'react'
import {Link} from 'react-router-dom'
import './sidebar.css'
import SidebarRow from './SidebarRow'
import {isAuthenticated} from '../auth'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'

function Sidebar() {
    return (
        <div className = "sidebar">
            <div className = "profile d-flex justify-content-center mb-2">
            <img src = {`${(process.env.NODE_ENV 
    === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}?${new Date().getTime()}`} 
                onError = {i => (i.target.src = `${DefaultProfile}`)}
                style = {{height: "150px", width: "150px", padding: '5px', objectFit: "cover", borderRadius: "50%"}}
            />
            </div>
            <div className = "user d-flex justify-content-center">
            <h4>{isAuthenticated().user.name}</h4>
            </div>
            <hr />
            <Link to= {`/post/create`}><button className = "btn btn-block primary-color-dark text-white mb-1 p-2" style = {{borderRadius: "25px"}}><AddRoundedIcon/> Create New Listing</button></Link>
            <a href = "https://group-project1.herokuapp.com/" target = "_blank"><SidebarRow Icon = {LocalHospitalIcon} title = "COVID-19 Information Center" /></a>
            <SidebarRow Icon = {PeopleIcon} title = "Friends" />
            <Link to = "/chat"><SidebarRow Icon = {ChatIcon} title = "Messenger" /></Link>
            <Link to = "/marketplace"><SidebarRow Icon = {StorefrontIcon} title = "Marketplace" /></Link>
            <a href ="https://gitfit-jessyrama.herokuapp.com/" target = "_blank"><SidebarRow Icon = {FitnessCenterOutlinedIcon} title = "GitFit Fitness Tracker" /></a>
            <a href ="https://ypangilinan.github.io/Travelogged/" target = "_blank"><SidebarRow Icon = {AirplanemodeActiveIcon} title = "Travelogged" /></a>
            <SidebarRow Icon = {VideoLibraryIcon} title = "Videos"/>
            <hr/>
        </div>
    )
}

export default Sidebar
