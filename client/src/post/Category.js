import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {singleCategory} from './apiPost'
import DefaultPost from '../images/logoshirt.png'
import { addItem } from './cartFunctions';
import {isAuthenticated} from '../auth';

export class Category extends Component {
    state = {
        posts:[],
        redirectToCart: false
    }

    componentDidMount = () => {
        const categoryName = this.props.match.params.categoryName;
        singleCategory(categoryName).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({posts:data})
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
        
        return (
            <div className="row">
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
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={photoUrl}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "185px", width: "100%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}...
                                </p>
                                <div className = "d-inline-block">
                                {this.showStock(post.quantity)}
                                {post.price ? (<p>Price: ${post.price}</p>): (<p>Price: Contact Lister</p>)}
                                {post.category ? (<p>Category: {post.category}</p>) : (<p>Category: None</p>)}
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
                                {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id ? (<Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm mr-2"
                                >
                                    View My Listing
                                </Link>) : (
                                    <>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm mr-2"
                                >
                                    View Listing
                                </Link>
                                 <button onClick = {addToCart} className="btn btn-raised btn-secondary btn-sm mr-5">Add to Cart</button>
                                 </>
                                )
                               }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    render() {
        const {posts, redirectToCart} = this.state

        if(redirectToCart){
            return(<Redirect to = "/cart" />)
        }
        
        return (
            <div className = "container">
               <h2>{this.props.match.params.categoryName}</h2> 
               {posts.length == 0 ? (<h2>No listings found</h2>) : this.renderPosts(posts)}
            </div>
        )
    }
}
export default Category
