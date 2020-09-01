import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Logo from '../images/inlinewhitebgMRKT.4.png'


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


    // signupForm = (name, email, password) => {
    //     return(
    //         <form>
    //             <div className="form-group">
    //                 <label className="text-muted">Name</label>
    //                 <input onChange={this.handleChange('name')} type="text" value={this.state.name} className="form-control" />
    //             </div>
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

   signupForm = (name, email, password) => {
        return (
          <MDBContainer>
            <MDBRow className = "d-flex justify-content-center">
              <MDBCol md="6">
                <MDBCard className = "mb-5">
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Sign up</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Your name"
                          icon="user"
                          group
                          type="text"
                          onChange={this.handleChange('name')}
                          value={this.state.name}
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Your email"
                          icon="envelope"
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
                          icon="lock"
                          group
                          onChange={this.handleChange('password')}
                          value={this.state.password}
                          type="password"
                          validate
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn onClick={this.clickSubmit} gradient="blue" className="btn-block z-depth-1a" type="submit">
                          Register
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        );
      };


    render() {
        const {name, email, password, open, error} = this.state
        return (
            <div className = "container">
                <div className = "row d-flex justify-content-center mt-4 mb-2">
                <img src = {Logo} style = {{height: "150px"}}alt = "logo"/>
                </div>
                <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                <div className = "alert alert-info" style = {{display: open ? "" : "none"}}>New account was successfully created.<Link to ="/signin">Please sign in.</Link> </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup
