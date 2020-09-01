import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {getBraintreeClientToken, processPayment} from './apiPost'
import {emptyCart, itemTotal} from './cartFunctions'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({items, setRun = f => f, run = undefined}) => {

    const [data,setData] = useState({
        success: false,
        clientToken : null,
        error: '',
        instance: {},
        address: ''
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
    },[])

    const getTotal = () => {

        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        },0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropin()}</div>
        ) : (
            <Link to="/">
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
                    <button onClick = {buy} className = "btn btn-raised btn-success btn-block">Pay Now</button>
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
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}

        </div>
    )
}

export default Checkout