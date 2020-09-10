import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardImage
  } from 'mdbreact';
import DefaultPost from '../images/logoshirt.png'
import { addItem } from '../post/cartFunctions';
import {isAuthenticated} from '../auth';
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import Comment from '../post/Comment';
import Likes from '../post/Likes';
import '../post/posts.css'

export class ProfilePosts extends Component {

    state = {
        posts:this.props.posts,
        comments: [],
        redirectToCart: false
    }

    showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };


      renderEmpty = () => {
          return(
        <div className = "emptycard">
          <h5><MDBIcon far icon="sad-cry" className = "mr-2" />This user currently has nothing to sell. </h5>
        </div>
          )
      }

    renderPosts = (posts,updateComments, comments, getNewLikes, likesCount) => {

        return (
            <>
                {posts.map((post, i) => {

                     const addToCart = () => {
                        addItem(post,this.setState({ redirectToCart: true }))
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
                        <MDBRow className = 'mb-1 d-flex justify-content-center'>
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
                                                {/* <p className = "addCart" onClick = {addToCart}><MDBIcon icon="cart-plus" className = "amber-text mt-2 mb-0" id = "cartIcon"style = {{marginTop: "2px",fontSize: "1rem"}} /> Add to Cart</p> */}
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
                                        <Likes className = "mr-2" id = "likes" likes = {post.likes} likesCount = {post.likesCount} postId = {post._id} getNewLikes = {getNewLikes} /> 
                                        <h5 className = "ml-4 mr-4">|</h5>
                                            <h5 className = " ml-1" id = "comments">{post.comments.length}{""} Comments</h5>
                                        </div>
                                        <hr/>
                                        <div className = "row mt-4" style = {{marginBottom: "-5px"}}>
                                            <div className = "col-lg-5 ml-4">
                                        <h4>{post.title}</h4>
                                        {post.category ? (<p style = {{color: "gray"}}>{post.category}</p>) : (<p style = {{color: "gray"}}>No Specified Category</p>)}
                                        </div>
                                            <div className = "col-lg-6">
                                            <div style = {{float:"right", marginTop: "15px"}}>
                                        {post.price ? (<h3 style = {{fontSize: "1.2rem"}}><b>${post.price}</b></h3>): (<h3 style = {{fontSize: "1.2rem"}}><b>Contact Lister</b></h3>)}</div>
                                            </div>
                                            </div>
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
        const {posts, updateComments, comments, getNewLikes, likesCount, redirectToCart} = this.props

        if(redirectToCart){
            return(<Redirect to = "/cart" />)
        }

        return (
               <>
                {posts.length === 0 ? this.renderEmpty() : this.renderPosts(posts,updateComments, comments, getNewLikes, likesCount)}
               </>
        )
    }
}

export default ProfilePosts

