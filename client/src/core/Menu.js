import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import './menu.css'
import Badge from './Badge';
import { itemTotal } from '../post/cartFunctions';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return "";
    } else {
        return <Badge />;
    }
};


const Menu = ({history}) => {
    return (
        <ul className = "nav nav-tabs">
            {/* {!isAuthenticated() && (
                 <React.Fragment>
                <li className = "nav-item"><Link className = "nav-link" to= "/siginin">Signin</Link></li>
                <li className = "nav-item"> <Link className = "nav-link" to= "/signup">Signup</Link></li>
                </React.Fragment>
            )} */}

             {isAuthenticated() && (
                 <>
                 <li className = "nav-item"><Link className="nav-link" to = {`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}`}</Link></li>
                <li className = "nav-item"><Link className = "nav-link" to= "/users">Users</Link></li>
                 <li className = "nav-item"><Link className="nav-link" to = {`/findpeople`}>Find People</Link></li>
                 <li className = "nav-item"><Link className="nav-link" to = {`/post/create`}>Create Listing</Link></li>
                 <li className = "nav-item"><Link className = "nav-link" to= "/">View All Listings</Link></li>
             <li className = "nav-item"><Link className = "nav-link" to= "/cart">View Cart{isActive(history, "/cart")}</Link></li>
                 <li className = "nav-item"><Link className = "nav-link" to= "/chat">Chat</Link></li>
                <li className = "nav-item"><span
                 className="nav-link"
                 style={{ cursor: 'pointer'}}
                 onClick={() => signout(() => history.push('/signin'))}>Signout</span></li>
                </>
             )}
        </ul>

    )
}

export default withRouter(Menu);

