import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {singleCategory} from './apiPost'
import DefaultPost from '../images/logoshirt.png'
import { addItem } from './cartFunctions';
import {isAuthenticated} from '../auth';
import MarketplaceSide from '../core/MarketplaceSide'
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
import './category.css';  

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

            <div className = "container-fluid">
                <div className = "row mt-1">
                    <div className = "col-lg-3 mt-3">
                    <MarketplaceSide />
                    </div>
                    <div className = "col-lg-8 mt-4">
                    <h2 className = " mt-2 mb-3">{this.props.match.params.categoryName}</h2> 
                    <hr />
                    {posts.length === 0 ? (<h4 className = "grey-text">No listings found</h4>) : this.renderPosts(posts)}
                    <div class="elfsight-app-09b0a2a5-ea11-497b-a6d0-a91f7895d725"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Category