import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth'

export class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        error: '',
        open: false
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name] : event.target.value })
    }

    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state
        const user = {name, email, password}
        // console.log(user);
        signup(user)
        .then(data => {
            if(data.error)this.setState({error: data.error})
            else this.setState({error: "", name: "", email: "", password:"", open: true})
        })
    }


    signupForm = (name, email, password) => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange('name')} type="text" value={this.state.name} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={this.handleChange('email')} type="email" value={this.state.email} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange('password')} type="password" value={this.state.password} className="form-control" />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            </form>
        )
    }


    render() {
        const {name, email, password, open, error} = this.state
        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Signup</h2>
                <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                <div className = "alert alert-info" style = {{display: open ? "" : "none"}}>New account was successfully created.<Link to ="/">Please sign in.</Link> </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup
