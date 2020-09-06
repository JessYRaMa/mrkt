import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {signin, authenticate} from '../auth'
import SocialLogin from './SocialLogin'
import { MDBBtn } from 'mdbreact';
import './signin.css';
import Logo from '../images/inlinebluebgMRKT.4.png'
import LoadingImg from '../images/cart.svg'
import { StreamChat } from 'stream-chat';
import { isAuthenticated } from '../auth';

const chatClient = new StreamChat('gx5a64bj4ptz');
var token;
var userID;
var userName;
try {
  token = chatClient.devToken(isAuthenticated().user._id);
  userID = isAuthenticated().user._id;
  userName = isAuthenticated().user.name;
} catch (error) {
  token = chatClient.devToken('john');
  userID = 'john';
  userName = 'john';
}
const userToken = token;

chatClient.setUser(
  {
    id: userID,
    name: userName,
    image: 'https://picsum.photos/'  },
  userToken,
);


export class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        redirectToReferer: false,
        loading: false
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name] : event.target.value })
    }


    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {email, password}
        // console.log(user);
        signin(user)
        .then(data => {
            if(data.error){
                this.setState({error: data.error, loading: false})
            }
            else{
                //authenticate
                authenticate(data, () => {
                    this.setState({redirectToReferer:true})
                })
            }
    
        })
    }

     signinForm = (email,password) => {
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
                        <h3 className="login-heading mb-4">Welcome back!</h3>
                        <form>
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
                                  Sign in
                                </MDBBtn>
                        </form>

                        <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                            or Sign in with:
                          </p>
                        <div className="row my-3 d-flex justify-content-center">
                        <SocialLogin />
                      </div>
                <p className="font-small grey-text d-flex justify-content-end">
                     Not a member? 
                      <Link className = "ml-2" to = "/signup"> Sign Up</Link>
                     </p>
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
        const {email, password, error, redirectToReferer, loading} = this.state

        if(redirectToReferer){
            return <Redirect to= "/" />
        }
        return (
          <>
                <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                {loading ? <img src = {LoadingImg} alt = "loading" id = "loadingImg" /> : (
                  <>
                {this.signinForm(email, password)}
                </>
                )}
                 </>
        )
    }
}

export default Signin
