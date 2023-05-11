
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
import Cookies from 'js-cookie';
const ResetPassword = () => {

   // toast.success(Cookies.get("notification"), {
   //    position: toast.POSITION.TOP_RIGHT
   // });
   const [inputValue, setInputValue] = useState('');
   const maxLength = 6;

   const handleInput = (e) => {
      let { value } = e.target;
      if (value.length <= maxLength) {
         setInputValue(value);
      }
   };
   const navigate = useNavigate();
   const user_id = Cookies.get("user_id");
   // form validation rules 
   const validationSchema = Yup.object().shape({
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
      confirm_password: Yup.string()
         .oneOf([Yup.ref('confirm_password'), null], 'Password must be matched')
         .required('Confirm Password is required'),
      otp: Yup.string().length(6).required('OTP must be 6 characters long'),
   });
   const formOptions = { resolver: yupResolver(validationSchema) };
   // get functions to build form with useForm() hook
   const { register, handleSubmit, reset, formState } = useForm(formOptions);
   const { errors } = formState;

   const [formData, setFormData] = useState({
      api_key: '',
      user_id: '',
      otp: '',
      password: '',
      confirm_password: '',
   });
   const [formErrors, setFormErrors] = useState({});

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
   const [err, setErr] = useState(null);
   const onSubmit = (data) => {
      const formDataObj = new FormData();
      console.log(FormData);
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('user_id', user_id);
      formDataObj.append('otp', formData.otp);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirm_password', formData.confirm_password);
      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.RESETPASSWORD),
            method: 'POST',
            data: formDataObj
         }).then(function (response) {
            //handle success
            console.log(response.data.status);
            if (response.data.status == 200) {
               toast.success(response.data.message, {
                  position: toast.POSITION.TOP_RIGHT
               });
               navigate('/auth/sign-in');; //To redirect to the user's login page
               setFormData({
                  api_key: '',
                  user_id: '',
                  otp: '',
                  password: '',
                  confirm_password: '',

               });//clear the form feild after data save
            }
            if (response.data.status == 500) {
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
                        <h1 className="mb-0">Reset Password</h1>
                        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>OTP</Form.Label>
                              <Form.Control {...register('otp')} value={formData.otp} onInput={handleInput} maxLength={maxLength} onChange={handleChange} type="text" className="mb-0" id="otp" name='otp' placeholder="Enter 6 digits OTP" />
                              <div >{errors.otp?.message}</div>
                              {inputValue.length > maxLength && (
                                 <p style={{ color: 'red' }}>Exceeded the maximum allowed length of {maxLength}</p>
                              )}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control {...register('password')} value={formData.password} onChange={handleChange} type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              <div >{errors.password?.message}</div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Confrim Password</Form.Label>
                              <Form.Control {...register('confirm_password')} value={formData.confirm_password} onChange={handleChange} type="password" className="mb-0" id="confirm_password" name='confirm_password' placeholder="Enter Confirm Password" />
                              <div >{errors.confirm_password?.message}</div>
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Button variant="primary" type="submit" className="float-end">Reset Password</Button>
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
export default ResetPassword
