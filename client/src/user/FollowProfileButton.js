import React, { Component } from 'react'
import {follow, unfollow} from './apiUser'
import {
    MDBIcon,
    MDBBtn,
    MDBTooltip
  } from 'mdbreact';

export class FollowProfileButton extends Component {

    followClick = () => {
        this.props.onButtonClick(follow)
    }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }


    render() {
        return (
            <div className = "d-inline-block">
                {
                    !this.props.following ? (
                        <MDBTooltip
                        domElement
                       tag="span"
                        material
                       placement="left"
                       style = {{marginTop: "-50px"}}
                       >
                    <span><MDBBtn floating size="lg" className = "mr-4" gradient="blue" onClick = {this.followClick}><MDBIcon icon="user-plus" /></MDBBtn></span>
                       <span style = {{marginTop: "-50px"}}>Follow</span>
                       </MDBTooltip>
                    ) : (
                        <MDBTooltip
                        domElement
                       tag="span"
                        material
                       placement="left"
                       style = {{marginTop: "-50px"}}
                       >
                    <span><MDBBtn floating size="lg" className = "mr-4" color = "success" onClick = {this.unfollowClick}><MDBIcon icon="user-minus" /></MDBBtn></span>
                       <span style = {{marginTop: "-50px"}}>Unfollow</span>
                       </MDBTooltip>
                    )
                }
            </div>
        )
    }
}

export default FollowProfileButton
