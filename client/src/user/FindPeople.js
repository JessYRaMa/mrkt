import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {findPeople, follow} from './apiUser'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import {isAuthenticated} from '../auth'
import {
    MDBRow,
    MDBCol,
    MDBAvatar,
    MDBIcon,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBTestimonial
  } from 'mdbreact';


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
        <MDBCarousel
          activeItem={1}
          length={3}
          slide
          showControls
          multiItem
          testimonial
        >
          <MDBCarouselInner>
            <MDBRow>
              <MDBCarouselItem itemId="1">
              {users.map((user, i) => (
                <MDBCol md='4' className='clearfix d-none d-md-block'>
                  <MDBTestimonial>
                    <MDBAvatar className='mx-auto'>
                      <img
                        src={`${(process.env.NODE_ENV 
                            === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }?${new Date().getTime()}`} 
                        onError = {i => (i.target.src = `${DefaultProfile}`)}
                        alt = {user.name}
                        style = {{height: "150px", width: "150px", padding: '5px', objectFit: "cover", borderRadius: "50%"}}
                        className='rounded-circle img-fluid'
                      />
                    </MDBAvatar>
                    <h4 className='font-weight-bold mt-4'>{user.name}</h4>
                    <h6 className='blue-text font-weight-bold my-3'>
                    <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary float-left btn-sm"
                        >
                            View Profile
                        </Link>
                    </h6>
                    <p className='font-weight-normal'>
                      <MDBIcon icon='quote-left' className='pr-2' />
                      <button onClick = {() => this.clickFollow(user,i)} className = "btn btn-raised btn-info float-right btn-sm">Follow</button>
                    </p>
                    <div className='grey-text'>
                      <MDBIcon icon='star' />
                      <MDBIcon icon='star' />
                      <MDBIcon icon='star' />
                      <MDBIcon icon='star' />
                      <MDBIcon icon='star' />
                    </div>
                  </MDBTestimonial>
                </MDBCol>
                  ))}
              </MDBCarouselItem>
            </MDBRow>
          </MDBCarouselInner>
        </MDBCarousel>
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
