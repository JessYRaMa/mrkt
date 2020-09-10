import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardUp,
    MDBAvatar,
    MDBCardBody
  } from 'mdbreact';
import {read, update, updateUser} from './apiUser'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import './editprofile.css'

export class EditProfile extends Component {

    state = {
        id: '',
        name: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: '',
        fileSize: 0,
        about: ''
    }

    init = (userId) => {
        const token = isAuthenticated().token
                read(userId, token)
                .then(data => {
                    if (data.error) {
                        this.setState({ redirectToProfile: true });
                    } else {
                        this.setState({ id: data._id, name: data.name, email: data.email, error: '', about: data.about});
                    }
                })
    }

    componentDidMount(){
        // console.log("user id", this.props.match.params.userId)
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const {name, email, password, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({error: "File size should be less than 100kb"})
            return false;
        }
        if(name.length ===0){
            this.setState({error: "Name is required"})
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({error: "A valid email is required"});
            return false;
        }
        if(password.length >=1 && password.length <=5){
            this.setState({error: "Password must be at least 6 characters long"})
            return false;
        }
        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.userData.set(name, value)
        this.setState({[name] : value, fileSize })
    }

    clickSubmit = event => {
        event.preventDefault();

        if(this.isValid()){
            // const { name, email, password } = this.state
            // const user = { name, email, password: password || undefined }
            // console.log(user);
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token
            update(userId, token, this.userData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error })
                    else
                    updateUser(data, ()=>{
                        this.setState({ redirectToProfile: true })
                    }) 
                })
        }
    }

    signupForm = (name, email, password, about) => {
        return(
            <form>
                <div className = "row">
                    <div className = "col-lg-5">
                    <div className="form-group">
                    <label className="text-muted">Profile Photo</label>
                    <input onChange={this.handleChange("photo")} type="file" accept="image/*" id = "fileInput" className="form-control" />
                    </div>
                    </div>
                    <div className = "col-lg-7">
                    <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange('name')} type="text" id = "profileForm" value={this.state.name} className="form-control" />
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-muted">About</label>
                    <textarea onChange={this.handleChange('about')} type="text" id = "profileForm" value={this.state.about} className="form-control" />
                </div>
                <div className  = "row">
                    <div className = "col-lg-6">
                    <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={this.handleChange('email')} type="email" id = "profileForm" value={this.state.email} className="form-control" />
                    </div>
                    </div>
                    <div className = "col-lg-6">
                    <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange('password')} type="password" id = "profileForm" value={this.state.password} className="form-control" />
                    </div>
                    </div>
                </div>
                <div className = "row mb-4" style = {{float: "right"}}>
                <button onClick={this.clickSubmit} className="btn btn-raised primary-color-dark text-white btn-sm" style = {{borderRadius: "25px"}}>Update</button>
                </div>
            </form>
        )
    }

    renderHeader = (name, id) => {

        const photoUrl = id ? `${(process.env.NODE_ENV 
            === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;
  
        return(
          <MDBRow>
          <MDBCol lg='12' md='12' className='mb-lg-0 mb-4'>
          <MDBCard testimonial style = {{borderRadius: "25px"}}>
            <MDBCardUp style = {{background: "#0d47a1", borderRadius: "25px 25px 0px 0px"}}>
            
            </MDBCardUp>
            <MDBAvatar className='p-1' style = {{height: "200px",width: "200px", float: "left", marginTop: "-100px", marginLeft: "100px"}}>
              <img
                src={photoUrl}
                onError = {i => (i.target.src = `${DefaultProfile}`)}
                alt={name}
                className='rounded-circle img-fluid'
                style = {{height: "200px",width: "205px",objectFit:"cover"}}
              />
            </MDBAvatar>
            <MDBCardBody>
              <div className = "user__details align-items-center">
                <h4 className='font-weight-bold mb-4'>{this.state.name}</h4>
                <h3 className  = "edit">Edit Profile</h3>
              </div>
              <hr />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
        )
      }


    render() {

        const {id, name, email, password, redirectToProfile, error, about} = this.state

        if(redirectToProfile){
            return(
                <Redirect to = {`/user/${id}`}/>
            )
        }

        const photoUrl = id ? `${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className = "container">
                {this.renderHeader(name, id, photoUrl)}
                <div className = "alert alert-danger" style = {{display: error ? "" : "none"}}>{error}</div>
                <div className = "editform mt-4 mb-5">
                {this.signupForm(name, email, password, about)}
                </div>
            </div>
        )
    }
}

export default EditProfile
