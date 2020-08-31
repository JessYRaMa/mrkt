import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {signin, authenticate} from '../auth'
import SocialLogin from './SocialLogin'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import './signin.css';
import Logo from '../images/inlinewhitebgMRKT.4.png'


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


    // signinForm = (email, password) => {
    //     return(
    //         <form>
    //             <div className="form-group">
    //                 <label className="text-muted">Email</label>
    //                 <input onChange={this.handleChange('email')} type="email" value={this.state.email} className="form-control" />
    //             </div>
    //             <div className="form-group">
    //                 <label className="text-muted">Password</label>
    //                 <input onChange={this.handleChange('password')} type="password" value={this.state.password} className="form-control" />
    //             </div>
    //             <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    //         </form>
    //     )
    // }

     signinForm = (email,password) => {
        return (
          <MDBContainer>
            <MDBRow className = "d-flex justify-content-center">
              <MDBCol md="6">
                <MDBCard className = "mb-5">
                  <MDBCardBody className="mx-4 mt-4">
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>Log in</strong>
                      </h3>
                    </div>
                    <MDBInput
                      label="Your email"
                      group
                      type="email"
                      onChange={this.handleChange('email')}
                      value={this.state.email}
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Your password"
                      group
                      type="password"
                      onChange={this.handleChange('password')}
                      value={this.state.password}
                      validate
                      containerClass="mb-0"
                    />
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        onClick={this.clickSubmit}
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Sign in
                      </MDBBtn>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
      
                      or Sign in with:
                    </p>
                    <div className="row my-3 d-flex justify-content-center">
                    <SocialLogin />
                    </div>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Not a member? 
                      <Link to = "/signup"> Sign Up</Link>
                    </p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        );
      };


    render() {
        const {email, password, error, redirectToReferer, loading} = this.state

        if(redirectToReferer){
            return <Redirect to= "/allposts" />
        }
        return (
            <div className = "container">
                {/* <h2 className = "mt-5 mb-5">Signin</h2> */}
                <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                {loading ? <div className = "jumbotron-text-center"><h2>loading...</h2></div> : ""}
                <div className = "row d-flex justify-content-center mt-4 mb-2">
                <img src = {Logo} style = {{height: "150px"}}alt = "logo"/>
                </div>
                {this.signinForm(email, password)}
            </div>
        )
    }
}

export default Signin
