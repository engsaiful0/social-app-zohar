
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from 'react-cookie';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../../apiConfig';


import 'swiper/swiper-bundle.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");



const SignUp = () => {
   const navigate = useNavigate();
   // let navigate = useNavigate();
   const validateForm = async () => {
      try {
         await validationSchema.validate(formData, { abortEarly: false });
         setFormErrors({}); // clear any previous errors
      } catch (err) {
         const errors = {};
         err.inner.forEach((error) => {
            errors[error.path] = error.message;
         });
         setFormErrors(errors); // set the errors state to the validation errors
      }
   };

   const dayOptions = Array.from(Array(31).keys()).map((day) => {
      const value = moment().date(day + 1).format('DD');
      return <option key={day} value={value}>{day + 1}</option>;
   });

   const yearOptions = Array.from(Array(80).keys()).map((year) => {
      const value = moment().year() - year;
      return <option key={year} value={value}>{value}</option>;
   });

   const monthOptions = moment.months().map((month, index) => {
      const value = moment().month(index).format('MM');
      return <option key={month} value={value}>{month}</option>;
   });

   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);
   const [error, setError] = useState(null);
   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               setLatitude(position.coords.latitude);
               setLongitude(position.coords.longitude);
            },
            (error) => {
               setError(error.message);
            }
         );
      } else {
         setError('Geolocation is not supported by your browser.');
      }
   }, []);

   // form validation rules 
   const validationSchema = Yup.object().shape({
      first_name: Yup.string()
         .required('First Name is required'),
      last_name: Yup.string()
         .required('Last Name is required'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
      confirm_password: Yup.string()
         .oneOf([Yup.ref('confirm_password'), null], 'Password must be matched')
         .required('Confirm Password is required'),
      termsAndConditions: Yup.bool()
         .oneOf([true], 'Accept Terms & Conditions is required')
   });
   const formOptions = { resolver: yupResolver(validationSchema) };

   // get functions to build form with useForm() hook
   const { register, handleSubmit, reset, formState } = useForm(formOptions);
   const { errors } = formState;

   const [formData, setFormData] = useState({
      api_key: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      location: '',
      location: '',
      platform: '',
      date_of_birth: '',
      year: '',
      month: '',
      day: '',
      termsAndConditions: false
   });
   const [formErrors, setFormErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      validateForm();
   }

   const [err, setErr] = useState(null);
   const platform = navigator.userAgent.match(/(Android|iPhone|iPod|iPad|Windows Phone|Tablet|Windows|Macintosh)/i)[0];

   const onSubmit = (data) => {
      // e.preventDefault();
      const formDataObj = new FormData();
      console.log(FormData);
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('first_name', formData.first_name);
      formDataObj.append('last_name', formData.last_name);
      formDataObj.append('email', formData.email);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirm_password', formData.confirm_password);
      formDataObj.append('location', latitude + ',' + longitude);
      formDataObj.append('platform', platform);
      if (formData.year != '' && formData.month != '' && formData.day != '') {
         formDataObj.append('date_of_birth', formData.year + '-' + formData.month + '-' + formData.day);
      }

      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.REGISTER),
            method: 'POST',
            data: formDataObj
         }).then(function (response) {
            //handle success
            console.log(response.data.status);
            if (response.data.status == 200) {
               toast.success('Form data saved successfully!', {
                  position: toast.POSITION.TOP_RIGHT
               });
               setFormData({
                  api_key: '',
                  first_name: '',
                  last_name: '',
                  email: '',
                  gender: '',
                  password: '',
                  confirm_password: '',
                  location: '',
                  platform: '',
                  date_of_birth: '',
                  year: '',
                  month: '',
                  day: '',
                  termsAndConditions: false
               });//clear the form feild after data save
               console.log(response.data.data.user_hash);
               ReactSession.set("user_hash", response.data.data.user_hash);


               //naviagte.push('/auth/verify-otp')
               navigate('/auth/verify-otp');

            }
            if (response.data.status == 500) {
               toast.error('Fill all fields and try again later!', {
                  position: toast.POSITION.TOP_RIGHT
               });
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
         <ToastContainer />
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
                              <Form.Control {...register('first_name')} value={formData.first_name} onChange={handleChange} type="text" className="mb-0" name='first_name' id="first_name" placeholder="Your First Name" />
                              <div >{errors.first_name?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control {...register('last_name')} value={formData.last_name} onChange={handleChange} type="text" className="mb-0" name='last_name' id="last_name" placeholder="Your Last Name" />
                              <div >{errors.last_name?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control {...register('email')} value={formData.email} onChange={handleChange} type="email" className="mb-0" id="email" name='email' placeholder="Enter email" />
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
                              <Form.Label htmlFor="gender">Date of Birth</Form.Label>
                              <Row>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       name="year"
                                       value={formData.year}
                                       onChange={handleChange}
                                    >
                                       <option selected value="">Year</option>
                                       {yearOptions}
                                    </Form.Control>
                                 </Col>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       name="month"
                                       value={formData.month}
                                       onChange={handleChange}
                                    >
                                       <option selected value="">Month</option>
                                       {monthOptions}
                                    </Form.Control>
                                 </Col>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       name="day"
                                       value={formData.day}
                                       onChange={handleChange}
                                    >
                                       <option selected value="">Day</option>
                                       {dayOptions}
                                    </Form.Control>
                                 </Col>
                              </Row>
                              <div >{errors.gender?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control {...register('password')} value={formData.password} onChange={handleChange} type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              <div >{errors.password?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control {...register('confirm_password')} value={formData.confirm_password} onChange={handleChange} type="password" className="mb-0" id="confirm_password" name='confirm_password' placeholder="Enter Confirm Password" />
                              <div >{errors.confirm_password?.message}</div>
                           </Form.Group>

                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input name="termsAndConditions" {...register('termsAndConditions')} onChange={handleChange} checked={formData.termsAndConditions} type="checkbox" className="me-2" id="termsAndConditions" />
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
