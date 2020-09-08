import React, { Component } from 'react'
import MarketplaceSide from '../core/MarketplaceSide'
import Category from './Category'
import Posts from './Posts'

export class Marketplace extends Component {
    render() {
        return (
            <>
            <div className = "container-fluid">
                <div className = "row mt-1">
                    <div className = "col-lg-3 mt-3">
                    <MarketplaceSide />
                    </div>
                    <div className = "col-lg-6 offset-1">
                    <Posts />
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Marketplace
