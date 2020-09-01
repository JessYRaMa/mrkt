import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/logoshirt.png";

class EditPost extends Component {
    state = {
            id: "",
            title: "",
            body: "",
            price: "",
            category: "",
            quantity: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    price: data.price,
                    category: data.category,
                    quantity: data.quantity,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    editPostForm = (title, body, price, category, quantity) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Product Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={this.handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className = "form-group">
                <label className = "text-muted">Category</label>
                <select onChange = {this.handleChange("category")}
                        className = "form-control" value = {category}>
                <option>Please Select a Category</option> 
                 <option>Clothing, Shoes, &amp; Jewelry</option> 
                 <option>Food &amp; Grocery</option>
                 <option>Books</option>
                 <option>Movies, Music &amp; Games</option>
                 <option>Electronics &amp; Computers</option>
                 <option>Home, Garden &amp; Tools</option>
                 <option>Pet Supplies</option> 
                 <option>Beauty &amp; Health</option> 
                 <option>Sports &amp; Outdoors</option>
                 <option>Handmade Goods</option> 
                 <option>Toys, Kids, &amp; Baby Items</option>
                 <option>Automotive &amp; Industrial</option>       
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={this.handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Post
            </button>
        </form>
    );

    render() {
        const {
            id,
            title,
            body,
            price,
            category,
            quantity,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${(process.env.NODE_ENV 
=== 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${this.props.match.params.postId}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={title}
                />

                {/* {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(title, body)} */}

                {isAuthenticated().user._id === id &&
                    this.editPostForm(title, body, price, category, quantity)}
            </div>
        );
    }
}

export default EditPost;