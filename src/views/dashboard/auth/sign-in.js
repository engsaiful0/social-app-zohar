
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../../apiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';




//img
import logo from '../../../assets/images/logo-full.png'



const SignIn = () => {

   let naviagte = useNavigate();
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

   // form validation rules 
   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
   });
   const formOptions = { resolver: yupResolver(validationSchema) };

   // get functions to build form with useForm() hook
   const { register, handleSubmit, reset, formState } = useForm(formOptions);
   const { errors } = formState;

   const [formData, setFormData] = useState({
      api_key: '',
      email: '',
      password: '',
      platform: '',
   });
   const [formErrors, setFormErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      validateForm();
   }

   const [err, setErr] = useState(null);
   const platform = navigator.userAgent.match(/(Android|iPhone|iPod|iPad|Windows Phone|Tablet|Windows|Macintosh)/i)[0];// To get the device identity

   const onSubmit = (data) => {
      // e.preventDefault();
      const formDataObj = new FormData();
      console.log(FormData);
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('platform', platform);
      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.AUTHENTICATE),
            method: 'POST',
            data: formDataObj
         }).then(function (response) {
            //handle success
            console.log(response.data.status);
            if (response.data.status == 200) {
               toast.success('You have signed in successfully!', {
                  position: toast.POSITION.TOP_RIGHT
               });
               //Cookies.set('token', token);            
               naviagte.push('/'); //To redirect to the user's timeline page
               setFormData({
                  api_key: '',
                  email: '',
                  password: '',
                  platform: '',
               });//clear the form feild after data save
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
                        <h1 className="mb-0">Sign in</h1>
                        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control {...register('email')} value={formData.email} onChange={handleChange} type="email" className="mb-0" id="email" name='email' placeholder="Enter email" />
                              <div >{errors.email?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Link to="/auth/forgot-password" className="float-end">Forgot password?</Link>
                              <Form.Control {...register('password')} value={formData.password} onChange={handleChange} type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              <div >{errors.password?.message}</div>
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Button variant="primary" type="submit" className="float-end">Sign in</Button>
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
export default SignIn
