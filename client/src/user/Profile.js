import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {read} from './apiUser'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardUp,
  MDBAvatar,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTooltip
} from 'mdbreact';
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'
import './profileHeader.css'
import Rating from './Ratings';
import ProfilePosts from './ProfilePosts'
import MessageSender from '../core/MessageSender'
import EditProfile from './EditProfile'
import { addItem } from '../post/cartFunctions';

export class Profile extends Component {
    state = {
        user: {following: [], followers: []},
        redirectToSignin:false,
        renderEdit: false,
        following: false,
        redirectToCart:false,
        error: '',
        posts: []
    }

    //check for follow
    checkFollow = user => {
        const jwt = isAuthenticated()
        const match = user.followers.find(follower => {
            //checking if it is already in followers list
            return follower._id === jwt.user._id
        })
        //will return true or false
        return match
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
    
        callApi(userId, token, this.state.user._id).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ user: data, following: !this.state.following });
          }
        });
      };


      init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            let following = this.checkFollow(data);
            this.setState({ user: data, following});
            this.loadPosts(data._id)
          }
        });
      };

      loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
          if(data.error){
            console.log(data.error)
          } else{
            let postsArray = data.map(post => {
              return {likesCount: post.likes.length, comments: post.comments, ...post}
          })
          this.setState({posts: postsArray})
          }
        })

      }

      updateComments = () => {
        const userId = this.state.user._id
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
        if(data.error){
            console.log(data.error)
        } else{
            let postsArray = data.map(post => {
                return {comments: post.comments, ...post}
            })
            this.setState({posts: postsArray})
        }
    })
    }

    getNewLikes = () => {
      const userId = this.state.user._id
      const token = isAuthenticated().token;
      listByUser(userId, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                let postsArray = data.map(post => {
                    return {likesCount: post.likes.length, ...post}
                })
                this.setState({posts: postsArray})
            }
        })
    }

    componentDidMount(){
        // console.log("user id", this.props.match.params.userId)
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props){
        // console.log("user id", this.props.match.params.userId)
        const userId = props.match.params.userId;
        this.init(userId);
    }
    

    renderHeader = (user) => {

      const photoUrl = user._id ? `${(process.env.NODE_ENV 
        === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }?${new Date().getTime()}` : DefaultProfile;

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
              alt={user.name}
              className='rounded-circle img-fluid'
              style = {{height: "200px",width: "205px",objectFit:"cover"}}
            />
          </MDBAvatar>
          <MDBCardBody>
            <div className = "row">
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <>
              <div className = "buttonContainer">
              <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="left"
                    style = {{marginTop: "-50px"}}
                    >
                     <Link to ={`/user/edit/${user._id}`}>
                            <MDBBtn floating size="lg" className = "mr-4" gradient="blue" onClick = {() => {this.setState({renderEdit : true})}} ><MDBIcon icon="user-edit" /></MDBBtn>
                            </Link>
                    <span style = {{marginTop: "-50px"}}>Edit Profile</span>
                    </MDBTooltip>
                    <DeleteUser userId = {user._id} />
              </div>
              </>              
                    ) : (
                      <>
                      <div className = "buttonContainer">
                        <FollowProfileButton
                        following={this.state.following}
                        onButtonClick={this.clickFollowButton}
                      />
                       <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    style = {{marginTop: "-50px"}}
                    >
                     <span>
                     <Link to ={`/chat`} onClick = {localStorage.setItem('chatID', this.props.match.params.userId), localStorage.setItem('chatName', this.state.user.name)}>
                     <MDBBtn floating size="lg" className = "mr-4" gradient="blue"><MDBIcon fab icon="facebook-messenger" /></MDBBtn>
                      </Link>
                     </span>
                    <span style = {{marginTop: "-50px"}}>Start Chat</span>
                    </MDBTooltip>
                      </div>
                      </>
                        )}
            </div>
            <div className = "user__details align-items-center">
              <h4 className='font-weight-bold mb-4'>{user.name}</h4>
              <Rating />
              <p>{`MRKT Member since ${new Date(user.created).toDateString()}`}</p>
            </div>
            <hr />
            <div className = "statistics">
              <div className = "number__followers">
                <h4>{user.followers.length}</h4>
                <p>FOLLOWERS</p>
              </div>
              <div className = "number__following">
              <h4>{user.following.length}</h4>
                <p>FOLLOWING</p>
              </div>
              <div className = "number__listings">
              <h4>{this.state.posts.length}</h4>
                <p>LISTINGS</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
      )
    }

    renderAbout = (user) => {
      return(
        <div className = "about__card">
          <div className = "card__top">
            <div className = "card__header">
              <h5><MDBIcon icon="portrait" className = "mr-2" />About Me</h5>
            </div>
          </div>
          <div className = "card__bottom">
            <div className = "about">
            {user.about ? <p>{user.about}</p> : <p>User has not shared anything about themselves yet. Send them a chat!</p>}
            </div>
          </div>
        </div>
      )
    }

  //   addToCart = (post) => {
  //     addItem(post,this.setState({ redirectToCart: true }))
  // }

    render() {

        const {redirectToSignin, user, posts, renderEdit, redirectToCart} = this.state
        if(redirectToSignin) return <Redirect to= "/signin"/>
        if(redirectToCart){
          return(<Redirect to = "/cart" />)
      }

//         const photoUrl = user._id ? `${(process.env.NODE_ENV 
// === 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className = "container">
              {this.renderHeader(user)}
                <div className = "row">
                  {renderEdit ? <EditProfile /> : (
                    <>
                    <div className = "col-lg-4 mt-2 aboutUser"style = {{height: "1000px", overflow: "scroll"}}>
                    {this.renderAbout(user)}
                    <ProfileTabs followers = {user.followers} following = {user.following}/>
                  </div>
                    <div className = "col-lg-8 mt-2" style = {{height: "1000px", overflow: "scroll"}}>
                      <MessageSender />
                      <ProfilePosts posts = {posts} userId = {user._id} likes = {posts.likesCount}  getNewLikes = {this.getNewLikes} updateComments = {this.updateComments} />
                      <div class="elfsight-app-09b0a2a5-ea11-497b-a6d0-a91f7895d725"></div>
                    </div>
                    </>
                  )}
                </div>

            </div>
        )
    }
}

export default Profile
