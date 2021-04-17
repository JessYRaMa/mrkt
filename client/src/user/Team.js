import React from 'react'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBAvatar,
    MDBIcon
  } from 'mdbreact';
import Marc from '../images/marc.jpeg'
import Yssa from '../images/yssa.jpeg'
import Rafael from '../images/rafael.jpeg'

export default function Team() {
    return (
        <div className = "container">
           <MDBCard className='my-5 px-5 pb-5 text-center' style = {{borderRadius: "25px"}}>
          <MDBCardBody>
            <h2 className='h1-responsive font-weight-bold my-5'>
              Meet the MRKT Team
            </h2>
            <MDBRow>
              <MDBCol lg='3' md='6' className='mb-lg-0 mb-5'>
                <MDBAvatar
                  tag='img'
                  src='https://ca.slack-edge.com/T0105GKDN1H-U0109GZP6HH-dcfd7b601289-512'
                  className='rounded-circle z-depth-1 img-fluid'
                  alt='Sample avatar'
                />
                <h5 className='font-weight-bold mt-4 mb-3'>Jessica Vaiana-Cavanagh</h5>
                <ul className='list-unstyled mb-0'>
                <a href='https://www.linkedin.com/in/jessica-vaiana-cavanagh/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/jessicavc' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0 mb-5'>
                <MDBAvatar
                  tag='img'
                  src={Yssa}
                  className='rounded-circle z-depth-1 img-fluid'
                  alt='Sample avatar'
                />
                <h5 className='font-weight-bold mt-4 mb-3'>Yssabel Pangilinan</h5>
                <ul className='list-unstyled mb-0'>
                <a href='https://www.linkedin.com/in/yssabel-pangilinan/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/YPangilinan' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0 mb-5'>
                <MDBAvatar
                  tag='img'
                  src={Marc}
                  className='rounded-circle z-depth-1 img-fluid'
                  alt='Sample avatar'
                />
                <h5 className='font-weight-bold mt-4 mb-3'>Marc Martinez</h5>
                <ul className='list-unstyled mb-0'>
                <a href='https://www.linkedin.com/in/marc-r-martinez/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/MarcM987' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-lg-0 mb-5'>
                <MDBAvatar
                  tag='img'
                  src={Rafael}
                  className='rounded-circle z-depth-1 img-fluid'
                  alt='Sample avatar'
                />
                <h5 className='font-weight-bold mt-4 mb-3'>Rafael Jimenez</h5>
                <ul className='list-unstyled mb-0'>
                <a href='https://www.linkedin.com/in/rafael-jimenez-4b100a1a3/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/Raffaj1208' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </ul>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
          </MDBCard>
            
        </div>
    )
}
