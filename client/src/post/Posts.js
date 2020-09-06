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

export class Posts extends Component {
    state = {
        posts:[],
        likes: 0,
        like: false,
        comments: '',
        redirectToCart: false
    }

    componentDidMount = () => {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({ posts: data})
            }
        })
    }
    
     updateComments = comments => {
        this.setState({ comments });
    };

    showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };

    renderPosts = posts => {
        const {likes, comments} = this.state
        return (
            <>
                {posts.map((post, i) => {

                const likeToggle = () => {
                    if(!isAuthenticated()){
                        this.setState({redirectToSignin: true})
                        return false;
                    }
                    let callApi = this.state.like ? unlike : like

                    const userId = isAuthenticated().user._id
                    const postId = post._id
                    const token = isAuthenticated().token

                    callApi(userId, token, postId).then(data => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            this.setState({
                                like: !this.state.like,
                                likes: data.likes.length
                            })
                        }
                    })
                }


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
                        <MDBRow className = 'd-flex justify-content-center'>
                            <MDBCol lg= "12">
                                <MDBCard news className = "my-5" style = {{borderRadius: "25px"}}>
                                    <MDBCardBody>
                                        <div className = "content">
                                            <div className = 'float right d-inline block' style = {{float:"right"}}>{this.showStock(post.quantity)} <br/>{new Date(post.created).toDateString()}</div>
                                            <div>
                                            <img src = {`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}`}
                                                    onError={i =>
                                                        (i.target.src = `${DefaultProfile}`)
                                                    }
                                                className='rounded-circle avatar-img z-depth-1-half'
                                                style = {{height:"40px", width: "40px", objectFit: "cover"}}
                                                alt = {post.title} />
                                                 <Link to={`${posterId}`} className = "mt-5 text-dark" style = {{fontSize:"1.25rem"}}>
                                                 {" "}{posterName}
                                                </Link>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                    <Link
                                    to={`/post/${post._id}`}>
                                    <MDBCardImage top src={photoUrl}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "auto", width: "100%" }}
                                /></Link>
                                <MDBCardBody>
                                    <div className = 'social-meta'>
                                        <div style = {{float: "left"}}>
                                        <h4>{post.title}</h4>
                                        <p>{post.body.substring(0, 100)}...</p>
                                        </div>
                                        <div style = {{float:"right", marginRight: "10px"}}>
                                        {post.price ? (<p style = {{fontSize: "1.2rem"}}>${post.price}</p>): (<p style = {{fontSize: "1.2rem"}}>Contact Lister</p>)}
                                        {post.category ? (<p style = {{color: "gray"}}>{post.category}</p>) : (<p style = {{color: "gray"}}>No Specified Category</p>)}
                                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id ? ("") : (
                                    <>
                                     <MDBTooltip
                                    domElement
                                    tag="span"
                                    material
                                    placement="top"
                                    >
                                    <MDBIcon icon="cart-plus" style = {{fontSize: "2rem"}} onClick = {addToCart} />
                                    <span>Add to Cart</span>
                                    </MDBTooltip>
                                 </>
                                )
                               }
                                        </div>
                                    </div>
                                    <br/>
                                    <div style = {{clear:"left"}}>
                               <br/>
                               <div className = "d-inline-block">
                               {like ? (
                                <p onClick={likeToggle}>
                                <MDBIcon className='mr-2' size = "2x" icon='heart' />{' '}
                                    {likes} Likes
                                </p>
                            ) : (
                                <p onClick={likeToggle}>
                                <MDBIcon className = "mr-2" size = "2x" icon='heart' />{' '}
                                    {likes} Likes
                                </p>
                            )}  
                               </div>
                                    </div>
                                    <hr />
                                    <Comment postId={post._id} comments = {post.comments.reverse()} updateComments = {this.updateComments}/>
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
