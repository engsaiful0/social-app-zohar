import React from 'react'
import {Row,Col,Container,Form,Button,Image} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useState } from "react";
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
	const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)
	
   let history =useNavigate()
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
               <Row>
                  
                  <div className="bg-white pt-5 pt-5 pb-lg-0 custom-sign-up-form pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Sign Up</h1>
                        <Form className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type="text" className="mb-0" id="exampleInputEmail1" placeholder="Your First Name" />
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="text" className="mb-0" id="exampleInputEmail1" placeholder="Your Last Name" />
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control type="email" className="mb-0" id="exampleInputEmail2" placeholder="Enter email" />
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="exampleFormControlSelect1">Gender</Form.Label>
                              <select className="form-select" id="exampleFormControlSelect1">
                                 <option>Select Gender</option>
                                 <option>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" className="mb-0" id="password" placeholder="Password" />
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control type="password" className="mb-0" id="confirmPassword" placeholder="Confirm Password" />
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input type="checkbox" className="me-2" id="customCheck1" />
                                 <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                              </Form.Check>
                              <Button type="button" className="btn-primary float-end" onClick={handleClick}>Sign Up</Button>
                           </div>
                           <div className="sign-info">
                              <span className="dark-color d-inline-block line-height-2">Already Have Account ? <Link to="/auth/sign-in">Log In</Link></span>                        
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

export default SignUp
