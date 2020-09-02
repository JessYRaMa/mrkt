import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Posts from '../post/Posts'
import {isAuthenticated} from '../auth'

export class Home extends Component {

    state = {
        redirectToSignin: false
    }

    renderHome = () => {
        return(
            <>
            <div className = "container mt-5">
            <Posts />
            </div>
            </>
        )
    }

    
    render() {
        const {redirectToSignin} = this.state

        if (redirectToSignin) {
            return(<Redirect to = "/signin" />)
        }
        return(
            <>
            {!isAuthenticated() ? <Redirect to = "/signin" /> : (this.renderHome())}
            </>
        )


}

}

export default Home
