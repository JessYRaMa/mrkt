import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {list} from './apiPost'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBTooltip
  } from 'mdbreact';
import DefaultPost from '../images/logoshirt.png'
import { addItem } from './cartFunctions';
import {isAuthenticated} from '../auth';
import './category.css';

export class AllCategory extends Component {
    state = {
        posts:[],
        redirectToCart: false
    }

    componentDidMount = () => {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({posts: data})
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

            <MDBRow>
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
                 <MDBCol md='4'>
                  <MDBCard narrow ecommerce className='mb-4' style = {{borderRadius: "25px;"}}>
                  <Link
                             to={`/post/${post._id}`}
                                >
                    <MDBCardImage
                      cascade
                      top
                      src={photoUrl}
                      alt={post.title}
                      onError={i =>
                          (i.target.src = `${DefaultPost}`)}
                      style = {{height: "200px", objectFit: "cover"}}    
                    /></Link>
                    <MDBCardBody cascade>
                      {post.category ? (<p> {post.category}</p>) : (<p>No Category</p>)}
                      <MDBCardTitle>
                        <strong>
                        {post.title.substring(0, 15)}...
                        </strong>
                      </MDBCardTitle>
                      <MDBCardText>
                       <Link to={`${posterId}`}>
                            by {posterName}{" "}
                            </Link>
                      </MDBCardText>
                      <MDBCardFooter className='px-1'>
                      {post.price ? (<span className='float-left'>${post.price}</span>): (<span className='float-left'>Contact Lister</span>)}
                        <span className='float-right'>
                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id ? (
                        
                        <MDBTooltip domElement placement='top'>
                                                <Link
                                to={`/post/${post._id}`}
                            >
                                <i className='fa fa-eye grey-text ml-3' />
                            </Link>
                            <span>View My Listing</span>
                            </MDBTooltip>
                        ) : (
                                <>
                                   
                            <MDBTooltip domElement placement='top'>
                            <Link
                             to={`/post/${post._id}`}
                                >
                            <i className='fa fa-eye grey-text ml-3' />
                                </Link>
                            <span>View Listing</span>
                          </MDBTooltip>
                          <MDBTooltip domElement placement='top'>
                            <i className='fas fa-cart-plus grey-text ml-3' onClick = {addToCart} />
                            <span>Add to Cart</span>
                          </MDBTooltip>
                            </>
                            )
                            }
                        </span>
                      </MDBCardFooter>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                );
                })}
            </MDBRow> 
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

export default AllCategory