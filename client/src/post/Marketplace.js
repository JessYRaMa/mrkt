import React, { Component } from 'react'
import MarketplaceSide from '../core/MarketplaceSide'
import AllCategory from './AllCategory'

export class Marketplace extends Component {
    render() {
        return (
            <>
            <div className = "container-fluid">
                <div className = "row mt-1">
                    <div className = "col-lg-3 mt-3">
                    <MarketplaceSide />
                    </div>
                    <div className = "col-lg-8 mt-4 p-1">
                    <h2 className = " mt-2 mb-3">All Listings</h2> 
                    <hr />
                    <AllCategory />
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Marketplace
