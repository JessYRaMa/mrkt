import React, { Component } from 'react'
import {singlePost, remove, like, unlike} from './apiPost'
import {isAuthenticated} from '../auth'
import DefaultPost from '../images/logoshirt.png'
import {Link, Redirect} from 'react-router-dom'
import Comment from './Comment'
import { addItem} from './cartFunctions';

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
                    like: this.checkLike(data.likes)
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
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };


    renderPost = (post) => {

        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
        const id = post && post.postedBy ? post.postedBy._id : null;
        const {like, likes} = this.state

        return (
                <div className="card-body">
                   
                    <img
                        src={`${(process.env.NODE_ENV 
                            === 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${post._id }?${new Date().getTime()}`}
                        alt={post.title}
                        onError={i =>
                            (i.target.src = `${DefaultPost}`)
                        }
                        className="img-thunbnail mb-3"
                        style={{ height: "auto", width: "auto", objectFit: "cover" }}
                    />

                        
                      {like ? (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-success"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up text-warning"
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>
                )}


                    <p className="card-text">
                        {post.body}
                    </p>
                    <div className = "d-inline-block">
                    {this.showStock(post.quantity)}
                    {post.price && (<p>Price: ${post.price}</p>)}
                    {post.category && (<p>Category: {post.category}</p>)}
                    </div>
                    <br />
                    <p className="font-italic">
                        Posted by{" "}
                        <Link to={`${posterId}`}>
                            {posterName}{" "}
                        </Link>
                        on {new Date(post.created).toDateString()}
                    </p>
                    <div className = "d-inline-block">
                    <Link
                        to={`/allposts`}
                        className="btn btn-raised btn-primary btn-sm mr-5"
                    >
                        Back to Listings
                    </Link>

                    {isAuthenticated().user && isAuthenticated().user._id === id ? (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
                                Update Listing
                            </Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger btn-sm">
                                Delete Listing
                            </button>
                        </>
                    ) : (<button onClick = {this.addToCart}className="btn btn-raised btn-secondary btn-sm mr-5">Add to Cart</button>)}
                    </div>
                </div>
        );
    }


    render() {

        const {post, redirectToHome, redirectToSignin, comments, redirectToCart} = this.state

        if (redirectToHome) {
            return <Redirect to={`/allposts`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/`} />;
        }else if (redirectToCart) {
            return <Redirect to={`/cart`} />;
        }

        return (
            <div className = "container">
                <h2 className = "display-2 mt-5 mb-5">{post.title}</h2>
                {this.renderPost(post)}

                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
            </div>
        )
    }
}

export default SinglePost
