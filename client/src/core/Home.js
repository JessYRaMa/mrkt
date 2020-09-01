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
            <div className = "jumbotron">
            <h2>All Posts</h2>
            <p className = "lead">This is my tester MRKT APP!</p>
            </div>
            <div className = "container">
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
