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
import './user.css';

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
        <MDBRow className = "mt-2 mb-3 d-flex align-items-center">
            {users.map((user, i) => (
                <MDBCol lg='3' md='12' sm='12' className='mb-lg-0 mb-4'>
                 <Link to = {`/user/${user._id}`}>
                <MDBCard className = "mt-2 mb-5" id = "friendCard" testimonial>
                  <MDBCardUp gradient='blue' style = {{height: "30px", borderRadius: "25px 25px 0px 0px"}} />
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
                    <h5 className='font-weight-bold mb-1' style = {{fontSize: "16px"}}>{user.name}</h5>
                    <p className='dark-grey-text mt-2' style = {{fontSize:"12px"}}>
                      {user.email}
                    </p>
                  </MDBCardBody>
                </MDBCard>
                </Link>  
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
                    <div class="elfsight-app-09b0a2a5-ea11-497b-a6d0-a91f7895d725"></div>
                </div>
            </div>
        )
    }
}

export default Users