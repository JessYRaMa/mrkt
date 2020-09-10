import React from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBAvatar,
    MDBIcon,
    MDBBtn
  } from 'mdbreact';

export default function Team() {
    return (
        <div className = "container">
            <MDBCard className='my-5 px-5 pb-1 text-center' style = {{borderRadius: "25px"}}>
          <MDBCardBody>
            <h2 className='h1-responsive font-weight-bold my-5'>
              The MRKT Team
            </h2>
            <MDBRow className='text-md-left'>
              <MDBCol lg='6' md='12' className='mb-5'>
                <MDBCol md='4' lg='6' className='float-left'>
                  <MDBAvatar
                    src='https://ca.slack-edge.com/T0105GKDN1H-U0109GZP6HH-dcfd7b601289-512'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    tag='img'
                    alt='Sample avatar'
                  />
                </MDBCol>
                <MDBCol md='8' lg='6' className='float-right'>
                  <h4 className='font-weight-bold mb-3'>Jessica Vaiana-Cavanagh</h4>
                  <h6 className='font-weight-bold grey-text mb-3'>
                    Professional Error Tester
                  </h6>
                  <p className='grey-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/jessica-vaiana-cavanagh/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/jessicavc' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </MDBCol>
              </MDBCol>

              <MDBCol lg='6' md='12' className='mb-5'>
                <MDBCol md='4' lg='6' className='float-left'>
                  <MDBAvatar
                    src='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/45330489_10217559092270437_1476428195212296192_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=jVgGWMhFpmMAX-ipYpt&_nc_ht=scontent-sjc3-1.xx&oh=550bf29c26f3f1145fb4e98705d14da9&oe=5F7D6F6A'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    tag='img'
                    alt='Sample avatar'
                  />
                </MDBCol>
                <MDBCol md='8' lg='6' className='float-right'>
                  <h4 className='font-weight-bold mb-3'>Yssabel Pangilinan</h4>
                  <h6 className='font-weight-bold grey-text mb-3'>
                    Science Nerd
                  </h6>
                  <p className='grey-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/yssabel-pangilinan/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/YPangilinan' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </MDBCol>
              </MDBCol>

              <MDBCol lg='6' md='12' className='mb-5'>
                <MDBCol md='4' lg='6' className='float-left'>
                  <MDBAvatar
                    src='https://media-exp1.licdn.com/dms/image/C5603AQHWy72M8yVWmQ/profile-displayphoto-shrink_800_800/0?e=1605139200&v=beta&t=S0JTdPoeys84o4yp1lVfDNaTKR3Hux14rfWzo7d2n2Q'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    tag='img'
                    alt='Sample avatar'
                  />
                </MDBCol>
                <MDBCol md='8' lg='6' className='float-right'>
                  <h4 className='font-weight-bold mb-3'>Marc Martinez</h4>
                  <h6 className='font-weight-bold grey-text mb-3'>
                    CERTS
                  </h6>
                  <p className='grey-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/marc-r-martinez/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/MarcM987' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </MDBCol>
              </MDBCol>

              <MDBCol lg='6' md='12' className='mb-5'>
                <MDBCol md='4' lg='6' className='float-left'>
                  <MDBAvatar
                    src='https://media-exp1.licdn.com/dms/image/C5603AQFkzMRgr1A15A/profile-displayphoto-shrink_800_800/0?e=1605139200&v=beta&t=B2LcuTGImJZvKgQ7a0cOwq7DZKSspRWmDNePpwOn2oY'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    tag='img'
                    alt='Sample avatar'
                  />
                </MDBCol>
                <MDBCol md='8' lg='6' className='float-right'>
                  <h4 className='font-weight-bold mb-3'>Rafael Jimenez</h4>
                  <h6 className='font-weight-bold grey-text mb-3'>
                    Front-end Developer
                  </h6>
                  <p className='grey-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/rafael-jimenez-4b100a1a3/' className='p-2 fa-lg li-ic'>
                    <MDBIcon fab icon='linkedin' />
                  </a>
                  <a href='https://github.com/Raffaj1208' className='p-2 fa-lg github-ic'>
                    <MDBIcon fab icon='github' />
                  </a>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
            
        </div>
    )
}
