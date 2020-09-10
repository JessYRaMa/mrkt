import React , {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {getBraintreeClientToken, processPayment} from './apiPost'
import {emptyCart, itemTotal, getCart} from './cartFunctions'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({items, setRun = f => f, run = undefined}) => {

    const [data,setData] = useState({
        success: false,
        clientToken : null,
        error: '',
        instance: {},
        address: '',
        cart: []
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error){
                setData({...data, error: data.error})
            } else{
                setData({clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
        showCart()
    },[])

    const getTotal = () => {

        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        },0)
    }

   const showCart = () => {
       return items.map(item => {
           return (
               <>
               <div className = "row">
                   <div className = "col-md-8">
                   <p>{item.title}</p>
                   </div>
                   <div className = "col-md-4">
                   <p>${item.price}</p>
                   </div>
               </div>
               </>
           )
       })

   }


    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropin()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const buy = () => {
        //send nonce to server (nonce = data.instance.requestPaymentMethod())
        let nonce; //card type, card number
        data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data)
            nonce = data.nonce
            // console.log('nonce and total to process', nonce, getTotal(items))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(items)
            }

            processPayment(userId, token, paymentData)
            .then(response => {
                setData({success:true})
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty cart')
                    itemTotal()
                })

            })
            .catch(error => console.log(error))
        })
        .catch(error => {
            // console.log('dropin error:', error)
            setData({...data, error: error.message})
        })

    }

    const showDropin = () => {
        return(
            <div onBlur = {() => setData({...data, error: ""})}>
            {data.clientToken !== null && items.length > 0 ? (
                <div>
                    <DropIn options = {{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
                    }} onInstance = {instance => (data.instance = instance)}/>
                    <button onClick = {buy} className = "btn btn-raised primary-color-dark text-white btn-block" style = {{borderRadius: "25px"}}>Pay Now</button>
                </div>
            ) : null}
        </div>
        )
    }

    const showError = error => (
        <div className = "alert alert-danger" style = {{display: error ? "" : 'none'}}>{error}</div>
    )

    const showSuccess = success => (
        <div className = "alert alert-info" style = {{display: success ? "" : 'none'}}>Thank you for using MRKT! Your payment was successful.</div>
    )

    return(
        <div>
            {showSuccess(data.success)}
            {showError(data.error)}
            {items.length === 0 ? <h5>Go shop!</h5> : (
                <>
                {showCart()}
                <hr />
                <div className = "row">
                    <div className = "col-md-8">
                        <h5>Total</h5>
                    </div>
                    <div className = "col-md-4">
                        <h5>${getTotal()}</h5>
                    </div>
                </div>
                </>
            )}
            <br /><br />
            <div className = "row">
                
            <img src = "https://pngimage.net/wp-content/uploads/2018/06/paypal-credit-card-png.png" style = {{width: "100%"}} alt = "creditcard" />
            </div>
            {showCheckout()}

        </div>
    )
}

export default Checkout