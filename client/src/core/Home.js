import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Posts from '../post/Posts'
import {isAuthenticated} from '../auth'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import MessageSender from './MessageSender';
import LoadingImg from '../images/cart.svg'

export class Home extends Component {

    state = {
        isLoading: true,
        redirectToSignin: false
    }

    componentDidMount() {
        this.setState({isLoading: false})
    }

    renderHome = () => {
        return(
            <>
            <div className = "container-fluid">
            <div className = "row mt-1">
            <div className = "col-lg-3">
            <Sidebar />  
            </div>
            <div className = "col-lg-6 ml-0">
            <MessageSender />
            <Posts />
            </div>
            <div className = "col-lg-2 mt-3">
            <Widgets />
            </div>
            </div>
            </div>
            </>
        )
    }

    
    render() {
        const {redirectToSignin, isLoading} = this.state

        if (redirectToSignin) {
            return(<Redirect to = "/signin" />)
        }
        return(
            <>
            {isLoading ? <img src = {LoadingImg} alt = "loading" id = "loadingImg" /> : this.renderHome()}
            {!isAuthenticated() ? <Redirect to = "/signin" /> : (this.renderHome())}
            </>
        )


}

}

export default Home
