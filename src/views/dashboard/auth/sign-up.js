import React , { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useCookies } from 'react-cookie';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { useForm } from "react-hook-form";
import { getApiUrl, API_ENDPOINTS,API_KEY } from '../../../apiConfig';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   
   const [formData, setFormData] = useState({
      api_key: API_KEY,
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
      formDataObj.append('api_key', API_KEY);
      formDataObj.append('first_name', formData.first_name);
      formDataObj.append('last_name', formData.last_name);
      formDataObj.append('email', formData.email);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirm_password', formData.confirm_password);
      try {
         axios({
            url: getApiUrl(API_ENDPOINTS.SIGNUP),
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

   const handleClick = async (e) => {
     
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
                              <Form.Control {...register("first_name", { required: true })}  onChange={handleChange} type="text"  className="mb-0" name='first_name' id="first_name" placeholder="Your First Name" />
                              {/* {errors.first_name && <p>{errors.first_name.message}</p>} */}
                              {errors.first_name && <p>This field is required.</p>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control {...register("last_name", { required: true })}  onChange={handleChange}  type="text" className="mb-0" name='last_name' id="last_name" placeholder="Your Last Name" />
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
                              <Form.Control  onChange={handleChange} {...register("password", { required: true })}  type="password" className="mb-0" id="password" name='password' placeholder="Enter Password" />
                              {formErrors.password && <span className="error">{formErrors.password}</span>}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control  onChange={handleChange} type="password" className="mb-0" name='confirm_password' id="confirm_password" placeholder="Enter Confirm Password" />
                              {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input name="termsAndConditions"  onChange={handleChange} checked={formData.termsAndConditions} type="checkbox" className="me-2" id="termsAndConditions" />
                                 <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                                <p>{formErrors.termsAndConditions && <span className="error">{formErrors.termsAndConditions}</span>}</p> 
                              </Form.Check>
                              <Button type="button" className="btn-primary float-end"  onClick={handleClick}>Sign Up</Button>
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
