import React, {Component} from 'react';
import {isAuthenticated} from '../auth';
import {like, unlike, singlePost} from './apiPost';

class Likes extends Component{

    constructor(props){
        super(props)
        this.state = {
            liked: false,
            likes:  props.likes.length,
            updated: false
        }
    }

    checkLike = (props) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = this.props.likes.indexOf(userId) !== -1;
        return match;
    }

    componentDidMount = () => {
        const postId = this.props.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    likes: data.likes.length,
                    liked: this.checkLike(data.likes)
                });
            }
        });
    };

    updatedLikes = (props) => {

        if(!isAuthenticated()){
            this.setState({redirectToSignin: true})
            return false;
        }

        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        const token = isAuthenticated().token

        let callApi = this.state.liked ? unlike : like

        callApi(userId, token, postId).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState((props) =>{
                    return{
                        liked: !this.state.liked,
                        likes: props.likes.length,
                        updated: !this.state.updated
                    }
                })
            }
        })
    }

    render(){
        return(
            <>
            <p onClick = {this.updatedLikes}>{this.state.liked ? "unlike" : "like"}</p>
            </>
        )
    }
} 


export default Likes;
