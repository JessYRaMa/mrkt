import React from 'react'
import {itemTotal} from '../post/cartFunctions';
import './menu.css'

const Badge = () => {
    
        return (
            <sup><small className = 'cart-badge'> <b> {itemTotal()}</b></small></sup>
        )
}

export default Badge
