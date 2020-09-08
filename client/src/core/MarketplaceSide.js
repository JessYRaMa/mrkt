import React from 'react'
import './sidebar.css';
import {Link} from 'react-router-dom';
import SidebarRow from './SidebarRow'
import StorefrontIcon from '@material-ui/icons/Storefront';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import DevicesIcon from '@material-ui/icons/Devices';
import DeckIcon from '@material-ui/icons/Deck';
import PetsIcon from '@material-ui/icons/Pets';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';

function MarketplaceSide() {
    return (
        <div className = "sidebar">
            <div className = "title">

            <h3><StorefrontIcon className = "ml-2 mr-2" style = {{fontSize: "xx-large"}} /> Marketplace</h3>    

            <hr />   

            <Link to= {`/post/create`}><button className = "btn btn-block primary-color-dark text-white mb-1 p-2" style = {{borderRadius: "25px"}}><AddRoundedIcon/> Create New Listing</button></Link>

            <hr />   
            
            <Link to = "/post/category/Food&amp;Grocery"><SidebarRow Icon = {FastfoodIcon} title = "Food &amp; Grocery" /></Link>
            <Link to = "/post/category/Clothing,Shoes,&amp;Jewelry"><SidebarRow Icon = {LocalMallIcon} title = "Clothing, Shoes &amp; Jewely" /></Link>
            <Link to ="/post/category/Books"><SidebarRow Icon = {MenuBookIcon} title = "Books"/></Link>
            <Link to ="/post/category/Movies,Music&amp;Games"><SidebarRow Icon = {MovieFilterIcon} title = "Movies, Music &amp; Games"/></Link>
            <Link to ="/post/category/Electronics&amp;Computers"><SidebarRow Icon = {DevicesIcon} title = "Electronics &amp; Computers"/></Link>
            <Link to ="/post/category/Home,Garden &amp;Tools"><SidebarRow Icon = {DeckIcon} title = "Home, Garden &amp; Tools"/></Link>
            <Link to ="/post/category/Pet"><SidebarRow Icon = {PetsIcon} title = "Pet"/></Link>
            <Link to ="/post/category/Beauty&amp;Health"><SidebarRow Icon = {LocalPharmacyIcon} title = "Beauty &amp; Health"/></Link>
            <Link to ="/post/category/Sports&amp;Outdoors"><SidebarRow Icon = {SportsHandballIcon} title = "Sports &amp; Outdoors"/></Link>
            <Link to ="/post/category/Handmade"><SidebarRow Icon = {ColorLensIcon} title = "Handmade"/></Link>
            <Link to ="/post/category/Toys,Kids,&amp;Baby Items"><SidebarRow Icon = {ChildFriendlyIcon} title = "Toys, Kids &amp; Baby Items"/></Link>
            <Link to ="/post/category/Automotive&amp;Industrial"><SidebarRow  Icon = {LocalGasStationIcon} title = "Automotive &amp; Industrials"/></Link>

            <hr />

            </div>
            
        </div>
    )
}

export default MarketplaceSide
