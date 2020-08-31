import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {read} from './apiUser'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'

export class Profile extends Component {
    state = {
        user: {following: [], followers: []},
        redirectToSignin:false,
        following: false,
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
            this.setState({ user: data, following });
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
            this.setState({posts: data})
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


    render() {

        const {redirectToSignin, user, posts} = this.state
        if(redirectToSignin) return <Redirect to= "/signin"/>

        const photoUrl = user._id ? `${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${user._id }?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className = "container">
                <div className = "row">
                <div className = "col-md-4">
                <h2>Profile</h2>
                <img style = {{height: "200px", width: "auto"}} className = "img-thumbnail" src = {photoUrl} onError = {i => (i.target.src = `${DefaultProfile}`)} alt = {user.name} />
                </div>
                <div className = "col-md-8">

                <div className = "lead mt-5">
                    <p>Hello {user.name}!</p>
                    <p>Email: {user.email}</p>
                    <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                </div>
                    {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                        <div className = "d-inline-block"> 
                        <Link className = "btn btn-raised btn-info mr-5" to ={`/post/create`}>
                                Create Listing
                            </Link>
                            <Link className = "btn btn-raised btn-success mr-5" to ={`/user/edit/${user._id}`}>
                                Edit Profile
                            </Link>
                            <DeleteUser userId = {user._id} />
                        </div>
                    ) : (
                        <FollowProfileButton
                        following={this.state.following}
                        onButtonClick={this.clickFollowButton}
                      />
                        )}

                        
                </div>
                </div>
                <div className = "row">
                    <div className = "col-md-12 mt-3">
                        <p className = "lead mt-3">{user.about}</p>
                        <hr />
                        <ProfileTabs followers = {user.followers} following = {user.following} posts = {posts}/>

                    </div>
                </div>

            </div>
        )
    }
}

export default Profile
