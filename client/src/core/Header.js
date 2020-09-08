import React, {Component} from 'react'
import "./Header.css"
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import Badge from './Badge';
import {MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBTooltip, MDBCollapse, MDBNavbarToggler, MDBNavbarNav, MDBNavbar} from "mdbreact";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import {Avatar, IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

class Header extends Component {

    state = {
         isOpen: false
        };
              
              toggleCollapse = () => {
                this.setState({ isOpen: !this.state.isOpen });
              }

        isActive = (history, path) => {
                if (history.location.pathname === path) {
                    return "";
                } else {
                    return <Badge />;
                }
            };
    
    render(){
        const {history} = this.props
        return (
           <>

            {isAuthenticated() && (
                <>
            <MDBNavbar dark expand="md">
                <div className = "header__left">
                    <img src = {DefaultProfile} style = {{height: "60px"}} alt = "logo" />
                </div>
        <MDBNavbarToggler image="https://mdbootstrap.com/img/svg/hamburger3.svg?color=00000" onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav>
                <div className = "header__input">
                    <SearchIcon />
                    <input type = "text" placeholder = "Search MRKT"/>
                </div>
    
                <div className = "header__center">
                    <div className = "header__option header__option--active">
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                    <Link color = "gray" to = "/"><HomeIcon fontSize = "large" /></Link>
                    <span>Home</span>
                    </MDBTooltip>
                    </div>
                    <div className = "header__option">
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                    <Link to= "/chat"><MDBIcon fab icon="facebook-messenger" size = "2x" className = "icon" /></Link>
                    <span>MRKT Messenger</span>
                    </MDBTooltip>
                    </div>
                    <div className = "header__option dropdown">
                        <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                     <StorefrontOutlinedIcon fontSize = "large" />
                     <span>Explore Categories</span>
                    </MDBTooltip>
                    </MDBDropdownToggle>
                     <MDBDropdownMenu className="dropdown-default">
                       <MDBDropdownItem href="/post/category/Clothing,Shoes,&amp;Jewelry">Clothing,Shoes,&amp;Jewelry</MDBDropdownItem>
                       <MDBDropdownItem href="/post/category/Food&amp;Grocery">Food&amp;Grocery</MDBDropdownItem>
                     <MDBDropdownItem href="/post/category/Books">Books</MDBDropdownItem>
                      <MDBDropdownItem href="/post/category/Movies,Music&amp;Games">Movies,Music&amp;Games</MDBDropdownItem>
                     <MDBDropdownItem href="/post/category/Electronics&amp;Computers">Electronics&amp;Computers</MDBDropdownItem>
                      <MDBDropdownItem href="/post/category/Home,Garden &amp;Tools">Home,Garden &amp;Tools</MDBDropdownItem>
                       <MDBDropdownItem href="/post/category/Pet">Pet</MDBDropdownItem>
                      <MDBDropdownItem href="/post/category/Beauty&amp;Health">Beauty&amp;Health</MDBDropdownItem>
                      <MDBDropdownItem href="/post/category/Sports&amp;Outdoors">Sports&amp;Outdoors</MDBDropdownItem>
                       <MDBDropdownItem href="/post/category/Handmade">Handmade</MDBDropdownItem>
                       <MDBDropdownItem href="/post/category/Toys,Kids,&amp;Baby Items">Toys,Kids,&amp;Baby Items</MDBDropdownItem>
                       <MDBDropdownItem href="/post/category/Automotive&amp;Industrial">Automotive&amp;Industrial</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                    </div>
                    <div className = "header__option">
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                    <Link to =  "/users"><SupervisedUserCircleOutlinedIcon fontSize = "large" /></Link>
                    <span>Explore Users</span>
                    </MDBTooltip>
                    </div>
                    <div className = "header__option">
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                    <Link to = "/cart"><ShoppingCartOutlinedIcon fontSize = "large" />{this.isActive(history, "/cart")}</Link>
                    <span>Cart</span>
                    </MDBTooltip>
                    </div>
                </div>
    
                <div className = "header__right">
                    <div className = "header__info">
                        <Avatar src = {`${(process.env.NODE_ENV 
    === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}?${new Date().getTime()}`}
    
    />
                   <Link to = {`/user/${isAuthenticated().user._id}`} className = "namelink"> <p><b>{`${isAuthenticated().user.name}`}</b></p></Link>
                    </div>
                    <div className = "header__info ml-2">
                    <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="bottom"
                    >
                    <Link to ={`/post/create`}><AddCircleOutlineIcon /></Link>
                    <span>Add New</span>
                    </MDBTooltip>
                    </div>
                    <div className = "header__info">
                    <MDBDropdown dropleft>
                    <MDBDropdownToggle color = "primary" nav>
                    <ExpandMoreIcon />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color = "default" className="dropdown-default">
                        <MDBDropdownItem> <span
                     className="nav-link"
                     style={{ cursor: 'pointer'}}
                     onClick={() => signout(() => history.push('/signin'))}>Signout</span></MDBDropdownItem>
                    </MDBDropdownMenu>
                    </MDBDropdown>
                    </div>
                </div>
                </MDBNavbarNav>
                </MDBCollapse> 
            </MDBNavbar>

                </>
            )}


           </>

         )
    }
}

export default withRouter(Header);