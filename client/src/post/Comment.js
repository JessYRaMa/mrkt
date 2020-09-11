import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
import {MDBIcon} from 'mdbreact'
import './commentDiv.css';

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                        // dispatch fresh list of coments to parent (SinglePost)
                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <div className = "commentDiv">
                <img src = {`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}?${new Date().getTime()}`}
                                                    onError={i =>
                                                        (i.target.src = `${DefaultProfile}`)
                                                    }
                                                className='rounded-circle avatar-img z-depth-1-half'
                                                style = {{height:"40px", width: "40px", objectFit: "cover"}}
                                                alt = "avatar" />
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                            className="form-control"
                            placeholder="Leave a comment..."
                            style = {{borderRadius: "25px", width: "100%"}}
                        />
                    </div>
                </form>
                </div>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12">
                    {/* <p className="text-black"><MDBIcon className='mr-2' size = "2x" icon='comment' />{comments.length} Comments</p> */}
                    {/* <hr /> */}
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_API_URL
                                        }/user/photo/${comment.postedBy._id}?${new Date().getTime()}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                <Link className = "text-dark" style = {{fontWeight: "bold"}}
                                            to={`/user/${comment.postedBy._id}`}
                                        >
                                            <b>{comment.postedBy.name}{" "}</b>
                                        </Link>
                                    <p>{comment.text}</p>
                                    <p className="font-italic" style = {{color: "gray", fontSize: "0.7rem", marginTop: "-15px"}}>
                                        {new Date(
                                            comment.created
                                        ).toDateString()}
                                        <span>
                                            {isAuthenticated().user &&
                                                isAuthenticated().user._id ===
                                                    comment.postedBy._id && (
                                                    <>
                                                        <span
                                                            onClick={() =>
                                                                this.deleteConfirmed(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-danger float-right mr-1"
                                                        >
                                                            <MDBIcon far icon="trash-alt" />
                                                        </span>
                                                    </>
                                                )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Comment;