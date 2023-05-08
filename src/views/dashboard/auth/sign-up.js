import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useCookies } from 'react-cookie';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../../apiConfig';
import { isMobile } from 'react-device-detect';
import { geolocated } from 'react-geolocation';

import 'swiper/swiper-bundle.min.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
   const [location, setLocation] = useState(null);
   const { coords } = this.props;
   setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
   });


   const [platform, setPlatform] = useState('');

   // Function to handle retrieving the user's platform information
   const handlePlatform = () => {
      const userAgent = navigator.userAgent;
      isMobile ? 'Mobile' : 'Desktop';
      setPlatform(isMobile);
   }
   // form validation rules 
   const validationSchema = Yup.object().shape({
      first_name: Yup.string()
         .required('First Name is required'),
      last_name: Yup.string()
         .required('Last Name is required'),
      // dob: Yup.string()
      //     .required('Date of Birth is required')
      //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
      password: Yup.string()
         .min(8, 'Password must be at least 8 characters')
         .required('Password is required'),
      confirm_password: Yup.string()
         .oneOf([Yup.ref('confirm_password'), null], 'Password must be matched')
         .required('Confirm Password is required'),
      //  termsAndConditions: Yup.bool()
      //  .oneOf([true], 'Accept Terms & Conditions is required')
   });
   const formOptions = { resolver: yupResolver(validationSchema) };

   // get functions to build form with useForm() hook
   const { register, handleSubmit, reset, formState } = useForm(formOptions);
   const { errors } = formState;

   const [formData, setFormData] = useState({
      api_key: API_KEY,
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      location: '',
      location: '',
      platform: '',
      termsAndConditions: false
   });
   const [formErrors, setFormErrors] = useState({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      termsAndConditions: '',
      location: '',
      platform: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
   }
   useEffect(() => {

   }, [formData]);
   const [err, setErr] = useState(null);
   

   const onSubmit = (data) => {
      // e.preventDefault();
      const formDataObj = new FormData();
      console.log(formDataObj);
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('first_name', formData.first_name);
      formDataObj.append('last_name', formData.last_name);
      formDataObj.append('email', formData.email);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirm_password', formData.confirm_password);
      formDataObj.append('location', location);
      formDataObj.append('platform', platform);
      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.SIGNUP),
            method: 'POST',
            data: formDataObj
         }).then(function (response) {
            //handle success
            console.log(response.status);
            if (response.status == 200) {
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
                              <Form.Control {...register('first_name')} onChange={handleChange} type="text" className="mb-0" name='first_name' id="first_name" placeholder="Your First Name" />
                              <div >{errors.first_name?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control {...register('last_name')} onChange={handleChange} type="text" className="mb-0" name='last_name' id="last_name" placeholder="Your Last Name" />
                              <div >{errors.last_name?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control {...register('email')} onChange={handleChange} type="email" className="mb-0" id="email" name='email' placeholder="Enter email" />
                              <div >{errors.email?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Gender</Form.Label>
                              <select  {...register('gender')} onChange={handleChange} className="form-select" id="gender" name='gender'>
                                 <option>Select Gender</option>
                                 <option>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                              <div >{errors.gender?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control {...register('password')} onChange={handleChange} {...register("password", { required: true })} type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              <div >{errors.password?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control onChange={handleChange} {...register('confirm_password')} type="password" className="mb-0" name='confirm_password' id="confirm_password" placeholder="Enter Confirm Password" />
                              <div >{errors.confirm_password?.message}</div>
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input name="termsAndConditions" onChange={handleChange} checked={formData.termsAndConditions} type="checkbox" className="me-2" id="termsAndConditions" />
                                 <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                                 <div >{errors.termsAndConditions?.message}</div>
                              </Form.Check>
                              <Button type="submit" className="btn-primary float-end">Sign Up</Button>
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
