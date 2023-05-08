import React , { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { useForm } from "react-hook-form";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => console.log(data);
   const [formData, setFormData] = useState({
      api_key: '311a5c4915683897f0bea2571aa2eca98398b33beb315b839e4270dff798b098',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      termsAndConditions: false
    });
    const [formErrors, setFormErrors] = useState({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      termsAndConditions: ''
    });
    const validateForm = () => {
      let errors = {};
      let isValid = true;
  
      if (!formData.first_name) {
        errors.first_name = 'First Name is required';
        isValid = false;
      }
      if (!formData.last_name) {
         errors.last_name = 'Last Name is required';
         isValid = false;
       }
      if (!formData.email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
        isValid = false;
      }
      if (!formData.password) {
         errors.password = 'Password is required';
         isValid = false;
       } else if (formData.password.length < 8) {
         errors.password = 'Password must be at least 8 characters long';
         isValid = false;
       }
   
       if (!formData.confirm_password) {
         errors.confirm_password = 'Confirm Password is required';
         isValid = false;
       } else if (formData.password !== formData.confirm_password) {
         errors.confirm_password = 'Passwords do not match';
         isValid = false;
       }
      if (!formData.gender) {
         errors.gender = 'Gender is required';
         isValid = false;
       }
       
       if (!formData.termsAndConditions) {
         errors.termsAndConditions = 'Please accept the terms and conditions';
         isValid = false;
       }

      setFormErrors(errors);
      return isValid;
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    useEffect(() => {
      validateForm();
    }, [formData]);
   const [err, setErr] = useState(null);


   const handleClick = async (e) => {
      e.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append('api_key', '311a5c4915683897f0bea2571aa2eca98398b33beb315b839e4270dff798b098');
      formDataObj.append('first_name', formData.first_name);
      formDataObj.append('last_name', formData.last_name);
      formDataObj.append('email', formData.email);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirm_password', formData.confirm_password);
      try {
         axios({
            url: "https://social-dev.cloud/public/users/register",
            method: 'POST',
            data: formDataObj
          }).then(function (response) {
              //handle success
              console.log(response.status);
            if(response.status==200)
            {
               toast.success("Form data saved successfully!");
            }
             
            }).catch(function (response) {
              //handle error
              console.log(response);
            });
      } catch (err) {
         setErr(err.response.data);
      }
   };

   // {"email":"abc@gmail.com"}
   console.log(err)

   let history = useNavigate()
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
                        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control  onChange={handleChange} type="text"  className="mb-0" name='first_name' id="first_name" placeholder="Your First Name" />
                              {formErrors.first_name && <span className="error">{formErrors.first_name}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control onChange={handleChange}  type="text" className="mb-0" name='last_name' id="last_name" placeholder="Your Last Name" />
                              {formErrors.last_name && <span className="error">{formErrors.last_name}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control  onChange={handleChange} type="email" className="mb-0" id="email" name='email' placeholder="Enter email" />
                              {formErrors.email && <span className="error">{formErrors.email}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Gender</Form.Label>
                              <select  onChange={handleChange} className="form-select" id="gender" name='gender'>
                                 <option>Select Gender</option>
                                 <option>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                              {formErrors.gender && <span className="error">{formErrors.gender}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control  onChange={handleChange}  type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              {formErrors.password && <span className="error">{formErrors.password}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control  onChange={handleChange} type="password" className="mb-0" name='confirm_password' id="confirm_password" placeholder="Enter Confirm Password" />
                              {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input name="termsAndConditions" checked={formData.termsAndConditions} type="checkbox" className="me-2" id="termsAndConditions" />
                                 <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                                <p>{formErrors.termsAndConditions && <span className="error">{formErrors.termsAndConditions}</span>}</p> 
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
