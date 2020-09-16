import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth'
import {MDBBtn} from 'mdbreact';
import './signin.css';
import Logo from '../images/inlinebluebgMRKT.4.png'
import LoadingImg from '../images/cart.svg'


export class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        error: '',
        open: false,
        loading: false
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name] : event.target.value })
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        const {name, email, password} = this.state
        const user = {name, email, password}
        // console.log(user);
        signup(user)
        .then(data => {
            if(data.error)this.setState({error: data.error, loading: false})
            else this.setState({error: "", name: "", email: "", password:"", open: true, loading: false})
        })
    }

   signupForm = (name, email, password) => {
     const {open, error} = this.state
        return (
          <>
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                <img src = {Logo} className = "mt-2" alt = "logo" style = {{height: "90px"}}/>
                <div className = "justify-content-center social_description">
                <h2>Your Social Marketplace</h2>
                    <p>With MRKT, get the financial benefits of Etsy and Craigslist with the social benefits of Facebook. What else could you possibly need?</p>
                </div>
              </div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Join our MRKT Family!</h3>
                        <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                <div className = "alert alert-warning" style = {{display: open ? "" : "none"}}>New account was successfully created.<Link to ="/signin">Please sign in.</Link> </div>
                        <form>
                        <div className="form-label-group">
                            <input type="text"  id="inputText" className="form-control"  onChange={this.handleChange('name')}
                                 value={this.state.name} placeholder="Name" required />
                            <label for="inputText">Your Name</label>
                          </div>
                          <div className="form-label-group">
                            <input type="email" id="inputEmail" className="form-control"  onChange={this.handleChange('email')}
                                value={this.state.email} placeholder="Email address" required autofocus />
                            <label for="inputEmail">Email address</label>
                          </div>
                          <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control"  onChange={this.handleChange('password')}
                                value={this.state.password} placeholder="Password" required />
                            <label for="inputPassword">Password</label>
                          </div>
                          <MDBBtn
                                  type="button"
                                  gradient="blue"
                                  onClick={this.clickSubmit}
                                  rounded
                                  className="btn-block z-depth-1a"
                                  style = {{borderRadius: "25px"}}
                                >
                                  Register
                                </MDBBtn>
                        </form>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      };


    render() {
        const {name, email, password, loading} = this.state
        return (
              <>
              {loading ? <img src = {LoadingImg} alt = "loading" id = "loadingImg" /> : (
                <>
                {this.signupForm(name, email, password)}
              </>
              )}
                </>
        )
    }
}

export default Signup