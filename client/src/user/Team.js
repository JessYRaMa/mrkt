import React from 'react'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBAvatar,
    MDBIcon
  } from 'mdbreact';

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
                  src='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/45330489_10217559092270437_1476428195212296192_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=jVgGWMhFpmMAX-ipYpt&_nc_ht=scontent-sjc3-1.xx&oh=550bf29c26f3f1145fb4e98705d14da9&oe=5F7D6F6A'
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
                  src='https://media-exp1.licdn.com/dms/image/C5603AQHWy72M8yVWmQ/profile-displayphoto-shrink_800_800/0?e=1605139200&v=beta&t=S0JTdPoeys84o4yp1lVfDNaTKR3Hux14rfWzo7d2n2Q'
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
                  src='https://media-exp1.licdn.com/dms/image/C5603AQFkzMRgr1A15A/profile-displayphoto-shrink_800_800/0?e=1605139200&v=beta&t=B2LcuTGImJZvKgQ7a0cOwq7DZKSspRWmDNePpwOn2oY'
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
