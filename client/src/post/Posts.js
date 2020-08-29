import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {list} from './apiPost'
import DefaultPost from '../images/simba.jpg'

export class Posts extends Component {
    state = {
        posts:[]
    }

    componentDidMount = () => {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({posts:data})
            }
        })
    }

    renderPosts = posts => {
        
        return (
            <div className="row">
                {posts.map((post, i) => {
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
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    View Post
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    render() {
        const {posts} = this.state
        return (
            <div className = "container">
               <h2>Recent Posts</h2> 
               {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts
