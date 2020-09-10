import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeItem} from './cartFunctions';
import DefaultPost from '../images/logoshirt.png'
import Checkout from './Checkout';
import LoadingImg from '../images/cart.svg';

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
            <div key = {i} setRun={setRun} run={run} className = "card">
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
        <div className = "container">
              
            {items.length === 0 ? noItemsMessage() :(

                    <div className ="row">
                    <div className = "col-6">
                    <h2>Shopping Cart</h2>
                       {showItems(items)}
                    </div>
                    <div className = "col-6">
                        <h2 className = "mb-4">Cart Summary</h2>
                        <hr />
                        <Checkout items = {items} setRun = {setRun} run = {run}/>
                    </div>
                    </div>
                
            )}
            
        </div>
    )
    
}
export default Cart;
