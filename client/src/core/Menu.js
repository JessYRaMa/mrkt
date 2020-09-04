import React, {Component} from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import './menu.css'
import Badge from './Badge';
import Logo from '../images/circlebluebgMRKT.4.png'


class Menu extends Component{

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


    render() {
        const {history} = this.props
    return (
        <>
        {isAuthenticated() && (
            <>
        <MDBNavbar color="primary-color-dark" dark expand="md">
                <MDBNavbarBrand>
          <img src = {Logo} style = {{height:"50px"}} alt = "logo"/>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">View All Listings</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/users">Community</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/findpeople">Find People</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={`/post/create`}>Create Listing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/chat">Chat</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Categories</div>
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
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to={`/user/${isAuthenticated().user._id}`}>
                <MDBIcon icon="user" />
                 {`${isAuthenticated().user.name}`}
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <span
                 className="nav-link"
                 style={{ cursor: 'pointer'}}
                 onClick={() => signout(() => history.push('/signin'))}>Signout</span>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBNavbar>
        </>
    )}
    </>

    )
    }
}

export default withRouter(Menu);


 // <ul className = "nav nav-tabs">
        //     {/* {!isAuthenticated() && (
        //          <React.Fragment>
        //         <li className = "nav-item"><Link className = "nav-link" to= "/siginin">Signin</Link></li>
        //         <li className = "nav-item"> <Link className = "nav-link" to= "/signup">Signup</Link></li>
        //         </React.Fragment>
        //     )} */}

        //      {isAuthenticated() && (
        //          <>
        //          <li className = "nav-item"><Link className="nav-link" to = {`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}`}</Link></li>
        //         <li className = "nav-item"><Link className = "nav-link" to= "/users">Users</Link></li>
        //          <li className = "nav-item"><Link className="nav-link" to = {`/findpeople`}>Find People</Link></li>
        //          <li className = "nav-item"><Link className="nav-link" to = {`/post/create`}>Create Listing</Link></li>
        //          <li className = "nav-item"><Link className = "nav-link" to= "/">View All Listings</Link></li>
        //      <li className = "nav-item"><Link className = "nav-link" to= "/cart">View Cart{isActive(history, "/cart")}</Link></li>
        //          <li className = "nav-item"><Link className = "nav-link" to= "/chat">Chat</Link></li>
        //         <li className = "nav-item"><span
        //          className="nav-link"
        //          style={{ cursor: 'pointer'}}
        //          onClick={() => signout(() => history.push('/signin'))}>Signout</span></li>
        //         </>
        //      )}
        // </ul>

