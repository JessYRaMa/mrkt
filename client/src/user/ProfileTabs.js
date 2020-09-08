import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/circlewhitebgMRKT.4.png'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardUp,
    MDBAvatar,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTooltip,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle
  } from 'mdbreact';
import './profileHeader.css'

export class ProfileTabs extends Component {
    render() {

        const {following, followers} = this.props

        return (
            <>
            <div className = "followers__card">
                <div className = "card__top">
                <div className = "card__header">
                <h5><MDBIcon icon="user-friends" className = "mr-2" />Followers</h5>
                </div>
                <div className = "card__count">
                <p>{followers.length} Followers</p>
                </div>
                </div>
                <br/>
                <div className = "card__bottom">
                <div className = "row pictures">
                {followers.map((person, i) => (
                                    <MDBTooltip
                                    domElement
                                   tag="span"
                                    material
                                   placement="top"
                                   style = {{marginTop: "-50px"}}
                                   >
                                   <span>
                                   <Link to={`/user/${person._id}`}>
                                                <img
                                                    style={{
                                                        borderRadius: "50%",
                                                        border: "1px solid none",
                                                        objectFit: "cover"
                                                    }}
                                                    className="mr-2 mb-2"
                                                    height="50px"
                                                    width="50px"
                                                    onError={i =>
                                                        (i.target.src = `${DefaultProfile}`)
                                                    }
                                                    src={`${(process.env.NODE_ENV 
                                                        === 'production') ? '' : 
                                                        process.env.REACT_APP_API_URL
                                                    }/user/photo/${person._id}`}
                                                    alt={person.name}
                                                />
                                                <div>
                                                </div>
                                            </Link>
                                   </span>
                                   <span style = {{marginTop: "-50px"}}>{person.name}</span>
                                   </MDBTooltip>
                                  ))}   
                </div>
                </div>
            </div>
                    
                <div className = "following__card">
                <div className = "card__top">
                <div className = "card__header">
                <h5><MDBIcon icon="users"className = "mr-2" />Following</h5>
                </div>
                <div className = "card__count">
                <p>{following.length} Following</p>
                </div>
                </div>
                <br/>
                <div className = "card__bottom">
                <div className = "row pictures">
                    {following.map((person, i) => (
                         <MDBTooltip
                         domElement
                        tag="span"
                         material
                        placement="top"
                        style = {{marginTop: "-50px"}}
                        >
                        <span>
                        <Link to={`/user/${person._id}`}>
                                     <img
                                         style={{
                                             borderRadius: "50%",
                                             border: "1px solid none",
                                             objectFit: "cover"
                                         }}
                                         className="mr-2 mb-2"
                                         height="50px"
                                         width="50px"
                                         onError={i =>
                                             (i.target.src = `${DefaultProfile}`)
                                         }
                                         src={`${(process.env.NODE_ENV 
                                             === 'production') ? '' : 
                                             process.env.REACT_APP_API_URL
                                         }/user/photo/${person._id}`}
                                         alt={person.name}
                                     />
                                     <div>
                                     </div>
                                 </Link>
                        </span>
                        <span style = {{marginTop: "-50px"}}>{person.name}</span>
                        </MDBTooltip>
                                   
                                  ))}   

                    </div>
                </div>
                       
                    </div>
                </>
        )
    }
}

export default ProfileTabs