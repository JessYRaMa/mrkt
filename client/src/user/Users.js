import React, { Component } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardUp,
    MDBAvatar,
    MDBCardBody,
    MDBIcon,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBTestimonial
  } from 'mdbreact';
import {Link} from 'react-router-dom'
import {list} from './apiUser'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import Sidebar from '../core/Sidebar'

export class Users extends Component {
    state = {
        users:[]
    }

    componentDidMount = () => {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({users:data})
            }
        })
    }


    renderUsers = users => (
        <MDBRow className = "mb-3">
            {users.map((user, i) => (
                <MDBCol lg='4' md='12' className='mb-lg-0 mb-4'>
                <MDBCard className = "mb-3" style = {{borderRadius: "25px"}} testimonial>
                  <MDBCardUp gradient='blue' style = {{borderRadius: "25px 25px 0px 0px"}} />
                  <MDBAvatar className='mx-auto'>
                    <img
                      src={`${(process.env.NODE_ENV 
                        === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }`} 
                        alt = {user.name}
                        onError = {i => (i.target.src = `${DefaultProfile}`)}
                      className='rounded-circle img-fluid'
                      style = {{height: "110px",width: "150px", objectFit: "cover"}} 
                    />
                  </MDBAvatar>
                  <MDBCardBody>
                    <h4 className='font-weight-bold mb-4'>{user.name}</h4>
                    <hr />
                    <p className='dark-grey-text mt-4'>
                      {user.email}
                    </p>
                    <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                            style = {{borderRadius: "25px"}}
                        >
                            View Profile
                        </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
    );


    render() {
        const {users} = this.state
        return (
            <div className = "container fluid">
                <div className = "row">
                    <div className = "col-lg-3">
                    <Sidebar />
                    </div>
                    <div className = "col-lg-9 mt-4">
                    {this.renderUsers(users)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users


{/* <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <div className = "mt-2 d-flex justify-content-center"> 
                    <img style = {{height: "150px", width: "150px", padding: '5px', objectFit: "cover", borderRadius: "50%"}} className = "img-thumbnail" src = {`${(process.env.NODE_ENV 
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
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            View Profile
                        </Link>
                    </div>
                </div> */}