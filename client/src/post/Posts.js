import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {list, like, unlike} from './apiPost'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTooltip,
    MDBInput,
    MDBCardImage
  } from 'mdbreact';
import DefaultPost from '../images/logoshirt.png'
import { addItem } from './cartFunctions';
import {isAuthenticated} from '../auth';
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import Comment from './Comment';
import Likes from './Likes';
import './posts.css'

export class Posts extends Component {
    state = {
        posts:[],
        comments: [],
        redirectToCart: false
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }


    componentDidMount = () => {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({posts: data})
                console.log(this.state.posts)
            }
        })
    }

    showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };

    renderPosts = posts => {

        const {comments} = this.state

        return (
            <>
                {posts.map((post, i) => {

                     const addToCart = () => {
                        addItem(post,this.setState({ redirectToCart: true }))
                    }

                    const updateComments = (comments) => {
                        list().then(data => {
                            if(data.error){
                                console.log(data.error)
                            } else{
                                this.setState({posts: data})
                            }
                        })
                    }

                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";
                    const photoUrl = post._id ? `${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${post._id }?${new Date().getTime()}` : DefaultPost;

                    return (
                        <MDBRow className = 'mt-1 mb-1 d-flex justify-content-center'>
                            <MDBCol lg= "12">
                                <MDBCard news className = "my-5" style = {{borderRadius: "25px"}}>
                                    <MDBCardBody>
                                        <div className = "content">
                                            <div className = 'float right d-inline block align-items-center' style = {{float:"right"}}>
                                            {this.showStock(post.quantity)}<br/>
                                            {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id ? (
                                                <>
                                                <Link to={`/post/edit/${post._id}`}>
                                                <MDBIcon far icon="edit" className = "ml-3 mt-2 mb-0" id = "editIcon"style = {{marginTop: "2px",fontSize: "1rem"}} />
                                                Edit 
                                                </Link>
                                            </>
                                            ) : (
                                                <>
                                                <p className = "addCart" onClick = {addToCart}><MDBIcon icon="cart-plus" className = "amber-text mt-2 mb-0" id = "cartIcon"style = {{marginTop: "2px",fontSize: "1rem"}} /> Add to Cart</p>
                                            </>
                                            )
                                        }
                                            </div>
                                            <div>
                                            <img src = {`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}`}
                                                    onError={i =>
                                                        (i.target.src = `${DefaultProfile}`)
                                                    }
                                                className='rounded-circle avatar-img z-depth-1-half'
                                                style = {{height:"40px", width: "40px", objectFit: "cover"}}
                                                alt = {post.title} />
                                                 <Link to={`${posterId}`} className = "mt-5 text-dark mb-0" style = {{fontSize:"1.25rem"}}>
                                                 {" "}{posterName}
                                                </Link>
                                                <p id = "date">{new Date(post.created).toDateString()}</p>
                                            </div>
                                            <p className = "productDescription">{post.body}</p>
                                        </div>
                                    </MDBCardBody>
                                    <Link
                                    to={`/post/${post._id}`}>
                                    <MDBCardImage className = "mt-0" top src={photoUrl}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "auto", width: "100%" }}
                                /></Link>
                                <MDBCardBody>
                                    <div className = 'social-meta'>
                                        <div className = "topDiv d-flex justify-content-center">
                                            <h5 className = "mr-2">{post.likes.length} {" "} likes</h5>
                                            <h5 className = "ml-4 mr-4">|</h5>
                                        <Likes className = "mr-2" id = "likes" likes = {post.likes} postId = {post._id} /> 
                                        <h5 className = "ml-4 mr-4">|</h5>
                                            <h5 className = " ml-1" id = "comments">{post.comments.length}{""} Comments</h5>
                                        </div>
                                        <hr/>
                                        <div style = {{marginLeft: "30px", float: "left"}}>
                                        <h4>{post.title}</h4>
                                        {post.category ? (<p style = {{color: "gray"}}>{post.category}</p>) : (<p style = {{color: "gray"}}>No Specified Category</p>)}
                                        </div>
                                        <div style = {{float:"right", marginTop: "15px" ,marginRight: "50px"}}>
                                        {post.price ? (<h3 style = {{fontSize: "1.2rem"}}><b>${post.price}</b></h3>): (<h3 style = {{fontSize: "1.2rem"}}><b>Contact Lister</b></h3>)}</div>
                                    </div>
                                    <br/>
                                    <div className = "mt-5" style = {{clear:"left"}}>
                                        {""}
                                    </div>
                                    <hr />
                                    <Comment className = "mt-2" postId={post._id} comments = {post.comments} updateComments = {updateComments}/>
                                </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    );
                })}
            </>
        );
    };


    render() {
        const {posts, redirectToCart} = this.state

        if(redirectToCart){
            return(<Redirect to = "/cart" />)
        }
        
        return (
            <>
               {this.renderPosts(posts)}
            </>
        )
    }
}

export default Posts
