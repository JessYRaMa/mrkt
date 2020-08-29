import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'

const Menu = ({history}) => {
    return (
        <ul className = "nav nav-tabs">
            {!isAuthenticated() && (
                 <React.Fragment>
                <li className = "nav-item"><Link className = "nav-link" to= "/">Signin</Link></li>
                <li className = "nav-item"> <Link className = "nav-link" to= "/signup">Signup</Link></li>
                </React.Fragment>
            )}

             {isAuthenticated() && (
                 <>
                 <li className = "nav-item"><Link className="nav-link" to = {`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s Profile`}</Link></li>
                <li className = "nav-item"><Link className = "nav-link" to= "/users">Users</Link></li>
                 <li className = "nav-item"><Link className="nav-link" to = {`/findpeople`}>Find People</Link></li>
                 <li className = "nav-item"><Link className="nav-link" to = {`/post/create`}>Create Post</Link></li>
                 <li className = "nav-item"><Link className = "nav-link" to= "/allposts">View All Posts</Link></li>
                <li className = "nav-item"><span
                 className="nav-link"
                 style={{ cursor: 'pointer'}}
                 onClick={() => signout(() => history.push('/'))}>Signout</span></li>
                </>
             )}
        </ul>

    )
}

export default withRouter(Menu);

