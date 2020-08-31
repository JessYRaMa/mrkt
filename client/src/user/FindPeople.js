import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {findPeople, follow} from './apiUser'
import DefaultProfile from '../images/simba.jpg'
import {isAuthenticated} from '../auth'

export class FindPeople extends Component {
    state = {
        users:[],
        error: "",
        open: false
    }

    componentDidMount = () => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        findPeople(userId, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({users:data})
            }
        })
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        follow(userId, token, user._id)
        .then(data => {
            if(data.error){
                this.setState({error: data.error})
            } else{
                let toFollow = this.state.users
                toFollow.splice(i,1)
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                })
            }
        })
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <div className = "mt-2 d-flex justify-content-center"> 
                    <img style = {{height: "150px", width: "150px", padding: '5px', objectFit: "cover", borderRadius: "50%"}} className = "img-thumbnail"  className = "img-thumbnail" src = {`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }`} 
                    onError = {i => (i.target.src = `${DefaultProfile}`)}
                    alt = {user.name}
                     />
                     </div>
                    <div className="card-body text-center">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary float-left btn-sm"
                        >
                            View Profile
                        </Link>
                        <button onClick = {() => this.clickFollow(user,i)} className = "btn btn-raised btn-info float-right btn-sm">Follow</button>
                    </div>
                </div>
            ))}
        </div>
    );


    render() {
        const {users, open, followMessage} = this.state
        return (
            <div className = "container">
               <h2>Find People</h2> 
               <div>
                   {open && (<p className = "alert alert-success">{followMessage}</p>)}
               </div>
               {this.renderUsers(users)}
            </div>
        )
    }
}

export default FindPeople
