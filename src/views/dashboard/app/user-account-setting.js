import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from "react-hook-form"
import axios from "axios"
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../../apiConfig'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
const UserAccountSetting = () => {
    const token = Cookies.get('token');
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
    const validateForm = async () => {
        try {
            await validationSchema.validate(formDataShow, { abortEarly: false });
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
        update_value: Yup.string()
            .required('This field is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [formDataShow, setUserFormDataShow] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        mobile: '',
        nickname: '',
        about: '',
        update_field: '',
        update_value: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormDataShow(prevState => ({ ...prevState, [name]: value }));
        validateForm();
    }

    /*Update each profile field here */
    const [err, setErr] = useState(null);
    const onSubmit = (data) => {
        // e.preventDefault();
        const formDataObj = new FormData();
        console.log(formDataShow);
        formDataObj.append('api_key', API_KEY);
        formDataObj.append('token', token);
        formDataObj.append('update_field', formDataShow.update_field);
        formDataObj.append('update_value', formDataShow.first_name);

        try {
            axios({
                url: getApiUrl(API_ENDPOINTS.PROFILE_UPDATE),
                method: 'POST',
                data: formDataObj
            }).then(function (response) {
                //handle success
                console.log(response.data.status);
                if (response.data.status == 200) {
                    Cookies.set("notification", response.data.message);
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setUserFormDataShow({
                        api_key: '',
                        update_field: '',
                        update_value: ''
                    });//clear the form feild after data save
                    console.log(response.data.data.user_hash);
                    Cookies.set("user_hash", response.data.data.user_hash);
                }
                if (response.data.status == 500) {
                    toast.error(response.data.Errors[0], {
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

    /*  Get User proifile data from here */
   


    useEffect(() => {
        try {
            const formDataObj = new FormData();
            console.log(FormData);
            formDataObj.append('api_key', API_KEY);
            formDataObj.append('token', token);
            axios({
                url: getApiUrl(API_ENDPOINTS.USER_PROFILE),
                method: 'POST',
                data: formDataObj
            }).then(function (response) {
                const { first_name, last_name, gender, date_of_birth, mobile, nickname, about } = response.data.data;
                setUserFormDataShow({ first_name, last_name, gender, date_of_birth, mobile, nickname, about });
                console.log(date_of_birth.split(' '));

                //handle success
                if (response.data.status == 200) {
                    //setUserData(response.data.data.first_name);
                    //console.log(response.data.data.first_name);
                }
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        } catch (err) {

        }
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <Col lg="12">
                        <Card>
                            <Card.Header className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Account Setting</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="acc-edit">

                                    <Form.Group className="form-group">
                                        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                            <Form.Label htmlFor="first_name" className="form-label">First Name</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="hidden" name="update_field" id="update_field" defaultValue="first_name" />
                                                    <Form.Control {...register('first_name')} onChange={handleChange} type="text" value={formDataShow.first_name} className="form-control" placeholder='Enter First Name' name="first_name" id="first_name" />
                                                    <div >{errors.first_name?.message}</div>
                                                </Col>
                                                <Col lg="2" md="2" sm="2">
                                                    <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="last_name" className="form-label">Last Name</Form.Label>
                                        <Row>
                                            <Col lg="9" md="9" sm="9">
                                                <Form.Control type="text" value={formDataShow.last_name} className="form-control" placeholder='Enter Last Name' name="last_name" id="last_name" defaultValue="" />
                                            </Col>
                                            <Col lg="2" md="2" sm="2">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="gender">Gender</Form.Label>
                                        <Row>
                                            <Col lg="9" md="9" sm="9">
                                                <select className="form-select" id="gender" name='gender'>
                                                    <option>{formDataShow.gender}</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>

                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="year">Date of Birth</Form.Label>
                                        <Row>
                                            <Col lg="3" md="3" sm="3">
                                                <Form.Control
                                                    as="select"
                                                    name="year"
                                                //    onChange={handleChange}
                                                >
                                                    <option>{formDataShow.date_of_birth.split('-')[0]}</option>
                                                    {yearOptions}
                                                </Form.Control>
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Form.Control
                                                    as="select"
                                                    name="month"
                                                //    value={formData.month}
                                                //    onChange={handleChange}
                                                >
                                                    <option>{formDataShow.date_of_birth.split('-')[1]}</option>
                                                    {monthOptions}
                                                </Form.Control>
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Form.Control
                                                    as="select"
                                                    name="day"
                                                //    onChange={handleChange}
                                                >
                                                    <option>{formDataShow.date_of_birth.split('-')[2]}</option>
                                                    {dayOptions}
                                                </Form.Control>
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>
                                        {/* <div >{errors.gender?.message}</div> */}
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="mobile" className="form-label">Mobile</Form.Label>
                                        <Row>
                                            <Col lg="9" md="9" sm="9">
                                                <Form.Control type="text" value={formDataShow.mobile} name="mobile" placeholder='Enter Last Mobile' className="form-control" id="mobile" defaultValue="" />
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="nickname" className="form-label">Nickname</Form.Label>
                                        <Row>
                                            <Col lg="9" md="9" sm="9">
                                                <Form.Control type="text" value={formDataShow.nickname} placeholder='Enter Last Nickname' className="form-control" name='nickname' id="nickname" defaultValue="" />
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="about" className="form-label">About</Form.Label>
                                        <Row>
                                            <Col lg="9" md="9" sm="9">
                                                <Form.Control type="text" value={formDataShow.about} placeholder='Enter Last About' className="form-control" name='about' id="about" defaultValue="" />
                                            </Col>
                                            <Col lg="3" md="3" sm="3">
                                                <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container >
        </>
    )

}

export default UserAccountSetting;