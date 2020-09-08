import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated, signout} from '../auth'
import {remove} from './apiUser'
import {MDBBtn, MDBIcon, MDBTooltip} from 'mdbreact'

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
            <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    style = {{marginTop: "100px",marginRight: "400px"}}
                    >
            <span><MDBBtn floating size="lg" gradient="blue" onClick = {this.deleteConfirmed}><MDBIcon icon="user-times" /></MDBBtn></span>
            <span style = {{marginTop: "100px",marginRight: "400px"}}>Delete Profile</span>
            </MDBTooltip>
        )
    }
}

export default DeleteUser
