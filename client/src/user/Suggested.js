import React from 'react'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBAvatar,
    MDBTooltip
  } from 'mdbreact';
import './suggested.css'
import Marc from '../images/marc.jpeg'
import Yssa from '../images/yssa2.jpg'
import Rafael from '../images/rafael.jpeg'


export default function Suggested() {
    return (
        <>
         <h4 className='h4-responsive font-weight-bold mt-3 mb-3' id = "suggestedFriendTitle">
              Suggested Friends
            </h4>
           
            <MDBRow>
              <MDBCol lg='3' md='6' className='mb-lg-0'>
              <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    >
                <a href = 'https://www.linkedin.com/in/jessica-vaiana-cavanagh/' target = "_blank" rel="noopener noreferrer"><MDBAvatar
                  tag='img'
                  src='https://ca.slack-edge.com/T0105GKDN1H-U0109GZP6HH-dcfd7b601289-512'
                  className='rounded z-depth-2 img-fluid'
                  alt='Sample avatar'
                  id = "suggestedPicture"
                  style = {{height: "200px", width: "175px", objectFit: "cover"}}
                /></a>
                    <span>Jessica Vaiana-Cavanagh</span>
                    </MDBTooltip>
                    <h5 className = "friendName">Jessica Vaiana-Cavanagh</h5>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0'>
              <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    >
                <a href = 'https://www.linkedin.com/in/yssabel-pangilinan/' target = "_blank" rel="noopener noreferrer"><MDBAvatar
                  tag='img'
                  src={Yssa}
                  className='rounded z-depth-2 img-fluid'
                  alt='Sample avatar'
                  id = "suggestedPicture"
                  style = {{height: "200px", width: "175px", objectFit: "cover"}}
                /></a>
                <span>Yssabel Pangilinan</span>
                    </MDBTooltip>
                    <h5 className = "friendName">Yssabel Pangilinan</h5>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0'>
              <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    >
                <a href = 'https://www.linkedin.com/in/marc-r-martinez/' target = "_blank" rel="noopener noreferrer"><MDBAvatar
                  tag='img'
                  src={Marc}
                  className='rounded z-depth-2 img-fluid'
                  alt='Sample avatar'
                  id = "suggestedPicture"
                  style = {{height: "200px", width: "175px", objectFit: "cover"}}
                /></a>
                <span>Marc Martinez</span>
                    </MDBTooltip>
                    <h5 className = "friendName">Marc Martinez</h5>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0'>
              <MDBTooltip
                     domElement
                    tag="span"
                     material
                    placement="top"
                    >
                <a href = 'https://www.linkedin.com/in/rafael-jimenez-4b100a1a3/' target = "_blank" rel="noopener noreferrer"><MDBAvatar
                  tag='img'
                  src={Rafael}
                  className='rounded z-depth-2 img-fluid'
                  alt='Sample avatar'
                  id = "suggestedPicture"
                  style = {{height: "200px", width: "175px", objectFit: "cover"}}
                /></a>
                 <span>Rafael Jimenez</span>
                    </MDBTooltip>
                    <h5 className = "friendName">Rafael Jimenez</h5>
              </MDBCol>
            </MDBRow>
            
        </>
    )
}
