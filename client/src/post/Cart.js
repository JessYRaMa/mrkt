import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeItem} from './cartFunctions';
import DefaultPost from '../images/logoshirt.png'
import Checkout from './Checkout';
import LoadingImg from '../images/cart.svg';
import {MDBIcon} from 'mdbreact'
import './cart.css'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Cart = () => {

    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(()=> {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return(
            <div className = "cartItemSection">
                  <Link
                             to={`/marketplace`}
                            >
                            <MDBIcon icon="angle-double-left" className = "mr-2" />Back to Listings
                            </Link>
                <div className = "cartItems mt-2 mb-3">
                <h2 style = {{letterSpacing: "3px"}}><ShoppingCartOutlinedIcon fontSize = "large" className = "mr-2" />MRKT CART</h2>
                <p className = "mt-3 grey-text">Your cart has {`${items.length}`} items</p>
                </div>
                <br />
                <hr />
        {items.map((post, i) => 
            <>
            <div key = {i} setRun={setRun} run={run} className = "row" style = {{clear: "left"}}>
                <div className = "col-md-4 mt-3">
                <Link
                        to={`/post/${post._id}`}>
                <img
                        src={`${(process.env.NODE_ENV 
                            === 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${post._id}`}
                        alt={post.title}
                        onError={i =>
                            (i.target.src = `${DefaultPost}`)
                        }
                        className="img-thunbnail mb-3"
                        style={{ height: "auto", width: "300px", objectFit: "cover" }}
                    /></Link>
                </div>
                <div className = "col-md-2">
                    
                </div>
                <div className = "col-md-6 mt-2" style = {{float: "right"}}>
                    <h4 className = "cartTitle">{post.title}</h4>
                    <p className = "categorycart">{post.category}</p>
                    <h5>${post.price}</h5>
                    <p className = "cartQuantity">Quantity:{post.count}</p>
                    <p className = "sellerInfo">Seller:  <Link to={`/user/${post.postedBy._id}`}>
                    {post.postedBy.name}{" "}
                        </Link></p>
                    <a className = "removeLink" onClick = {() => {
                         removeItem(post._id); setRun(!run);
                     }}><u>Remove Item</u></a>
                     </div>         
                </div>
                <hr/> 
            </>
        )}
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
            <>
            <div className = "row justify-content-center">
                <div className = "col-lg-6 offset-3">
                <img src = {LoadingImg} alt = "cart" />
                </div>
                </div>
            <br />
            <div className = "row justify-content-center">
            <div className = "col-lg-6 offset-3 mr-5">
            <h2>Your cart is empty.</h2>
            
            <h4><Link to = "/marketplace">Continue to the MRKT</Link></h4>
            </div>
            </div>
        </>
        )
    }

    return(
        <div className = "container-fluid">
            
           
                <>
                    <div className ="row">
                    <div className = "col-7 offset-1 mb-5">
                    {items.length === 0 ? noItemsMessage() :(  showItems(items)  )}
                    </div>
                    <div className = "col-3 mt-5">
                        <div className = "cartSummary mt-3">
                        <h5 style = {{letterSpacing: "3px"}}>Order Summary</h5>
                        <hr />
                        <Checkout items = {items} setRun = {setRun} run = {run}/>
                        </div>
                        <div className = "addon">
                     <p>Privacy | Terms | Advertsing | Ad Choices | Cookies | More | MRKT &#169; 2020</p>
                     </div>
                    </div>
                    </div>
                 </>
                
        
            
        </div>
    )
    
}
export default Cart;
