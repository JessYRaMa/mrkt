import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './menu.css'
import Header from './Header'

class Menu extends Component{
    render() {
        return(
            <Header />
        )
    }
}

export default withRouter(Menu);
