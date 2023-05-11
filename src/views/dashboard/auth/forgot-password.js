import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';


import { useState, useRef } from 'react';
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../../apiConfig';
import Cookies from 'js-cookie';
function onChange(value) {
   console.log("Captcha value:", value);
}
const recaptchaRef = React.createRef();

const ForgotPassword = () => {
   const captchaRef = useRef(null);
   let navigate = useNavigate();
   const user_hash = Cookies.get("user_hash");
   // get functions to build form with useForm() hook
   // form validation rules 
   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
   });
   const formOptions = { resolver: yupResolver(validationSchema) };
   const { register, handleSubmit, reset, formState } = useForm(formOptions);
   const { errors } = formState;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      validateForm();
   }
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
   const [formData, setFormData] = useState({
      api_key: '',
      email: '',
      password: '',
   });
   const [formErrors, setFormErrors] = useState({});
   const [err, setErr] = useState(null);
   const onSubmit = (data) => {
      // e.preventDefault();
      const formDataObj = new FormData();
      console.log(FormData);
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.RECOVER),
            method: 'POST',
            data: formDataObj
         }).then(function (response) {
            //handle success
            if (response.data.status == 200) {
               Cookies.set("user_id", response.data.user.user_id);
               Cookies.set("email", response.data.user.email);
               toast.success(response.data.message, {
                  position: toast.POSITION.TOP_RIGHT
               });
               navigate('/auth/reset-password'); //To redirect to the reset password page
               setFormData({
                  api_key: '',
                  email: '',
               });//clear the form feild after data save
            }
            if (response.data.status == 500) {
               Cookies.set("notification", response.data.message);
               toast.error(response.data.message, {
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
               <Row className="no-gutters">
                  <div className="bg-white pt-5 custom-sign-in-form pt-5 pb-lg-0 pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Forgot Password</h1>
                        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control {...register('email')} value={formData.email} onChange={handleChange} type="email" className="mb-0" id="email" name='email' placeholder="Enter email" />
                              <div >{errors.email?.message}</div>
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <div className='formGroup'>
                                 <ReCAPTCHA sitekey="6Lc7Cv4lAAAAAJ2eszDXff0Iftn1CdB79YaKQ-HH" ref={captchaRef} />
                              </div>
                           </div>
                           <div className="d-inline-block w-100">
                              <Button variant="primary" type="submit" className="float-end">Submit</Button>
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
