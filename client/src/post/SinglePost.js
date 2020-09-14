import React, { Component } from 'react'
import {singlePost, remove, like, unlike} from './apiPost'
import {isAuthenticated} from '../auth'
import DefaultPost from '../images/logoshirt.png'
import {Link, Redirect} from 'react-router-dom'
import Comment from './Comment'
import { addItem} from './cartFunctions';
import MarketplaceSide from '../core/MarketplaceSide'
import './singlepost.css';
import {MDBIcon} from 'mdbreact'

export class SinglePost extends Component {
    state = {
        post: '',
        like: false,
        likes: 0,
        redirectToHome: false,
        redirectToSignin: false,
        redirectToCart: false,
        comments: []
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
    };

    updateComments = comments => {
        this.setState({ comments });
    };

    likeToggle = () => {
        if(!isAuthenticated()){
            this.setState({redirectToSignin: true})
            return false;
        }
        let callApi = this.state.like ? unlike : like

        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
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

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    addToCart = () => {
        addItem(this.state.post,this.setState({ redirectToCart: true }))
    }

    showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill p-2" style = {{marginTop: "-10px"}}>In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill p-2">Out of Stock </span>
        );
      };


    renderPost = (post) => {

        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
        // const id = post && post.postedBy ? post.postedBy._id : null;
        const {like, likes} = this.state

        return (
                    <div className = "row mb-4">
                        <div className = "col-md-5"> 
                        <Link
                             to={`/marketplace`}
                            >
                            <MDBIcon icon="angle-double-left" className = "mr-2" />Back to Listings
                            </Link>
                    <img
                        src={`${(process.env.NODE_ENV 
                            === 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${post._id }?${new Date().getTime()}`}
                        alt={post.title}
                        onError={i =>
                            (i.target.src = `${DefaultPost}`)
                        }
                        className="img-thunbnail"
                        id = "productImage"
                    />
                        </div>
                        <div className = "col-md-4 offset-3 mt-5 ">
                        {like ? (
                    <p onClick={this.likeToggle}>
                        <MDBIcon icon="heart" className = "red-text mr-2" />{" "}{likes} Likes
                    </p>
                ) : (
                    <p onClick={this.likeToggle}>
                       <MDBIcon icon="heart" className = "mr-2" />{" "}{likes} Likes
                    </p>
                )}
                {post.price && (<h3>${post.price}.00</h3>)}

                    <p className="card-text">
                        {post.body}
                    </p>
                    <div className = "d-inline-block">
                    {post.category && (<p>Category: {post.category}</p>)}
                    {this.showStock(post.quantity)}
                    </div>
                    <br />
                    <p className="font-italic grey-text mt-3">
                        Posted by{" "}
                        <Link to={`${posterId}`}>
                            {posterName}{" "}
                        </Link>
                        on {new Date(post.created).toDateString()}
                    </p>
                    <div className = "d-inline-block">
                            {this.renderButtons(post)}
                            </div>
                        </div>
                    </div>
        );
    }

    renderButtons = (post) => {

        // const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        // const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
        const id = post && post.postedBy ? post.postedBy._id : null;
        // const {like, likes} = this.state;
        return(
            <>
            {isAuthenticated().user && isAuthenticated().user._id === id ? (
                <>
                    <Link to={`/post/edit/${post._id}`} className="btn btn-raised primary-color-dark text-white btn-sm" style = {{borderRadius: "25px"}}>
                    <MDBIcon far icon="edit" className = "mr-2" />Edit Listing
                    </Link>
                    <button onClick={this.deleteConfirmed} className="btn btn-raised danger-color-dark text-white btn-sm" style = {{borderRadius: "25px"}}>
                    <MDBIcon far icon="trash-alt" className = "mr-2"/>Remove Listing
                    </button>
                </>
            ) : (<button onClick = {this.addToCart}className="btn btn-raised blue-gradient text-white btn-sm" style = {{borderRadius: "25px"}}><MDBIcon icon="cart-plus" className = "mr-2"/>Add to Cart</button>)}
         </>
        )
    }


    render() {

        const {post, redirectToHome, redirectToSignin, comments, redirectToCart} = this.state

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }else if (redirectToCart) {
            return <Redirect to={`/cart`} />;
        }

        return (
            <div className = "container-fluid">

                <div className = "row">
                    <div className = "col-lg-3 mt-3">
                        <MarketplaceSide />
                    </div>

                    <div className = "col-lg-8 mt-4 pl-5">
                        <div className = "row">
                            <div className = "productNameDiv">
                            <h2 className = " mt-2 mb-3">{post.title}</h2>
                            </div>
                        </div>
                    <hr />
                        {this.renderPost(post)}
                   <hr />
                  <h5><MDBIcon far icon="comments" className = "mr-2"/>{comments.length} Comments</h5>   
                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
                <div class="elfsight-app-09b0a2a5-ea11-497b-a6d0-a91f7895d725"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SinglePost
