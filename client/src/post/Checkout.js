import React from 'react';
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'

const Checkout = ({items}) => {

    const getTotal = () => {

        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        },0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-primary">Checkout</button>
        ) : (
            <Link to="/">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>

            {showCheckout()}

        </div>
    )
}

export default Checkout