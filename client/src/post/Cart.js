import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeItem, itemTotal } from './cartFunctions';
import DefaultPost from '../images/simba.jpg'
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(()=> {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
        {items.map((post, i) => 
            <>
            <div key = {i} className = "card">
                <div className = "card-body">
                <img
                        src={`${(process.env.NODE_ENV 
                            === 'production') ? '' : process.env.REACT_APP_API_URL}/posts/photo/${post._id}`}
                        alt={post.title}
                        onError={i =>
                            (i.target.src = `${DefaultPost}`)
                        }
                        className="img-thunbnail mb-3"
                        style={{ height: "150px", width: "auto", objectFit: "cover" }}
                    />

                    <h2>{post.title}</h2>
                    <p>Price: ${post.price}</p>
                    <br/>
                    <Link
                        to={`/post/${post._id}`}
                            className="btn btn-raised btn-primary btn-sm mr-5"
                                >
                                View Listing
                                </Link>
                     <button className = "btn btn-raised btn-warning btn-sm" onClick = {() => {
                         removeItem(post._id); setRun(!run);
                     }}>Remove from Cart</button>         
                </div>
            </div>
            </>
        )}
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
        <h2>Your cart is empty. <br/><Link to = "/allposts">Continue Shopping</Link></h2>
        )
    }

    return(
        <div className = "container">
            
           <h2>Shopping Cart</h2>
            
            <div className ="row">
                <div className = "col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className = "col-6">
                    <h2 className = "mb-4">Cart Summary</h2>
                    <hr />
                    <Checkout items = {items} setRun = {setRun} run = {run}/>
                </div>
            </div>
        </div>
    )
    
}
export default Cart;
