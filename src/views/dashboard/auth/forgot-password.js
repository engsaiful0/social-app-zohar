import React from 'react';

import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
// import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import {useState,useRef} from 'react';


function onChange(value) {
   console.log("Captcha value:", value);
}
const recaptchaRef = React.createRef();


// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const ForgotPassword = () => {
   const captchaRef = useRef(null);
   let history = useNavigate();
   return (
      <>
         <section className="sign-in-page">
            <div id="container-inside">
               <div id="circle-small"></div>
               <div id="circle-medium"></div>
               <div id="circle-large"></div>
               <div id="circle-xlarge"></div>
               <div id="circle-xxlarge"></div>
            </div>
            <Container className="p-0">
               <Row className="no-gutters">
                  <div className="bg-white pt-5 custom-sign-in-form pt-5 pb-lg-0 pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Forgot Password</h1>
                        <Form className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control type="email" className="mb-0" id="email" placeholder="Enter email" />
                           </Form.Group>
                           <div className="d-inline-block w-100">

                              <div className='formGroup'>
                                 <ReCAPTCHA sitekey="6LeuXtslAAAAABmwB46qwv0U_Yte_QOPU_3FLb9U" ref={captchaRef} />
                              </div>
                           </div>
                           <div className="d-inline-block w-100">
                              <Button variant="primary" type="button" className="float-end" onClick={() => history.push('/')}>Submit</Button>
                           </div>
                           <div className="sign-info">
                              <span className="dark-color d-inline-block line-height-2">Don't have an account? <Link to="/auth/sign-up">Sign up</Link></span>
                           </div>
                        </Form>
                     </div>
                  </div>
               </Row>
            </Container>
         </section>
      </>
   )
}

export default ForgotPassword
