import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated, signout} from '../auth'
import {remove} from './apiUser'

export class DeleteUser extends Component {

    state ={
        redirect: false
    }

    deleteAccount = () => {
        console.log('deleted account')
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                signout(()=> {
                    console.log('user is deleted')
                    this.setState({redirect:true})
                })
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?")
        if(answer) {
            this.deleteAccount()
        }
    }



    render() {
        if(this.state.redirect){
            return <Redirect to = "/signin"/>
        }
        return (
               <button className = "btn btn-raised btn-danger" onClick = {this.deleteConfirmed}>Delete Profile</button> 
        )
    }
}

export default DeleteUser
