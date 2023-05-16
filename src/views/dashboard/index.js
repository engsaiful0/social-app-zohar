import React, { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col, Form, Container, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'
import Card from '../../components/Card'
import CustomToggle from '../../components/dropdowns'
import ShareOffcanvas from '../../components/share-offcanvas'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getApiUrl, API_ENDPOINTS, API_KEY } from '../../apiConfig';
import { checkIfUserIsLoggedIn } from '../../checkIfUserIsLoggedIn';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//image
import user1 from '../../assets/images/user/1.jpg'
import user01 from '../../assets/images/user/01.jpg'
import user2 from '../../assets/images/user/02.jpg'
import user3 from '../../assets/images/user/03.jpg'
import user4 from '../../assets/images/user/04.jpg'
import img1 from '../../assets/images/small/07.png'
import img2 from '../../assets/images/small/08.png'
import img3 from '../../assets/images/small/09.png'
import img4 from '../../assets/images/small/10.png'
import img5 from '../../assets/images/small/11.png'
import img6 from '../../assets/images/small/12.png'
import img7 from '../../assets/images/small/13.png'
import img8 from '../../assets/images/small/14.png'
import p1 from '../../assets/images/page-img/p1.jpg'
import s1 from '../../assets/images/page-img/s1.jpg'
import s2 from '../../assets/images/page-img/s2.jpg'
import s3 from '../../assets/images/page-img/s3.jpg'
import s4 from '../../assets/images/page-img/s4.jpg'
import s5 from '../../assets/images/page-img/s5.jpg'
import p2 from '../../assets/images/page-img/p2.jpg'
import p3 from '../../assets/images/page-img/p3.jpg'
import p4 from '../../assets/images/page-img/p4.jpg'
import p5 from '../../assets/images/page-img/p5.jpg'
import img42 from '../../assets/images/page-img/42.png'
import icon1 from '../../assets/images/icon/01.png'
import icon2 from '../../assets/images/icon/02.png'
import icon3 from '../../assets/images/icon/03.png'
import icon4 from '../../assets/images/icon/04.png'
import icon5 from '../../assets/images/icon/05.png'
import icon6 from '../../assets/images/icon/06.png'
import icon7 from '../../assets/images/icon/07.png'
import img9 from '../../assets/images/small/img-1.jpg'
import img10 from '../../assets/images/small/img-2.jpg'
import loader from '../../assets/images/page-img/page-load-loader.gif'


const Index = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const token = Cookies.get("token");
    let navigate = useNavigate();
    useEffect(() => {
        // check if the user is logged in
        const isLoggedIn = checkIfUserIsLoggedIn();
        console.log(isLoggedIn);
        // if the user is not logged in, redirect to the sign-in page
        if (!isLoggedIn) {
            navigate('/auth/sign-in');
        }
    }, [navigate]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [formData, setFormData] = useState({
        api_key: '',
        token: '',
        description: '',
        privacy_code: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

    }

    const [error, setError] = useState(null);
    const onSubmit = (data) => {
        setIsLoading(true);
        const formDataObj = new FormData();
        //console.log(FormData);
        formDataObj.append('api_key', API_KEY);
        formDataObj.append('token', token);
        formDataObj.append('description', formData.description);
        formDataObj.append('privacy_code', formData.privacy_code);
        try {
            axios({
                url: getApiUrl(API_ENDPOINTS.CREATE_POST),
                method: 'POST',
                data: formDataObj
            }).then(function (response) {
                //handle success
                console.log(response.data.status);
                if (response.data.status == 200) {
                    setShow(false);//To close the modal
                    Cookies.set("notification", response.data.message);
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setFormData({
                        api_key: '',
                        token: '',
                        description: '',
                        privacy_code: ''
                    });//clear the form feild after data save
                    console.log(response.data.data.user_hash);
                    Cookies.set("user_hash", response.data.data.user_hash);
                }
                if (response.data.status == 500) {
                    toast.error(response.data.Errors[0], {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                setIsLoading(false);
                
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        } catch (err) {
            setError(err.response.data);
        }
    };



    return (
        <>
            <div id="content-page" className="content-page">
                <Container>
                    <Row className="birthday-connections-trending-container m-0 p-0">
                        <Card id="post-modal-data" className="card-block card-stretch card-height">
                            <Card.Body >
                                <Col lg={12} sm={12} md={12} className="row m-0 p-0">
                                    <Col lg={4} sm={4} md={4} className="row m-0 p-0 birdday-container">
                                        <Link to="#" className="btn btn-primary d-block mt-3">Birthday</Link>
                                    </Col>
                                    <Col lg={4} sm={4} md={4} className="row m-0 p-0 connections-container">
                                        <Link to="#" className="btn btn-success d-block mt-3">Connections</Link>
                                    </Col>
                                    <Col lg={4} sm={4} md={4} className="row m-0 p-0 trending-container">
                                        <Link to="#" className="btn btn-danger d-block mt-3">Trending Topics</Link>
                                    </Col>
                                </Col>
                                <Col lg={12} sm={12} md={12} className="row m-0 p-0 create-post-for-mobile">
                                    <Link onClick={handleShow} to="#" className="btn btn-primary d-block mt-3">Creat Post</Link>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <Col lg={8} className="row m-0 p-0">
                            <Col sm={12} >
                                <Card id="post-modal-data" className="creat-post-card-for-web card-block card-stretch card-height">
                                    <div className="card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Create Post</h4>
                                        </div>
                                    </div>
                                    <Card.Body >
                                        <div className="d-flex align-items-center">
                                            <div className="user-img">
                                                <img src={user1} alt="user1" className="avatar-60 rounded-circle" />
                                            </div>


                                            <input data-bs-toggle="modal" onClick={handleShow} type="text"  className="form-control rounded" placeholder="Write something here..." style={{ border: "none" }} />
                                          


                                        </div>
                                        <hr></hr>
                                        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                                            <li className="me-3 mb-md-0 mb-2">
                                                <Link to="#" className="btn btn-soft-primary">
                                                    <img src={img1} alt="icon" className="img-fluid me-2" /> Photo/Video
                                                </Link>
                                            </li>
                                            <li className="me-3 mb-md-0 mb-2">
                                                <Link to="#" className="btn btn-soft-primary">
                                                    <img src={img2} alt="icon" className="img-fluid me-2" /> Tag Friend
                                                </Link>
                                            </li>
                                            <li className="me-3">
                                                <Link to="#" className="btn btn-soft-primary">
                                                    <img src={img3} alt="icon" className="img-fluid me-2" /> Feeling
                                                </Link>
                                            </li>
                                            <li>
                                                <button className=" btn btn-soft-primary">
                                                    <div className="card-header-toolbar d-flex align-items-center">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as='div' className="lh-1">
                                                                <span className="material-symbols-outlined">
                                                                    more_horiz
                                                                </span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={handleShow} href="#">Check in</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleShow} href="#">Live Video</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleShow} href="#">Gif</Dropdown.Item>

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </button>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                    <Modal size="lg" className="fade" id="post-modal" onHide={handleClose} show={show} >
                                        <Modal.Header className="d-flex justify-content-between">
                                            <Modal.Title id="post-modalLabel">Create Post</Modal.Title>
                                            <Link to="#" className="lh-1" onClick={handleClose} >
                                                <span className="material-symbols-outlined">close</span>
                                            </Link>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form onSubmit={handleSubmit(onSubmit)} className="post-text ms-3 w-100 " data-bs-toggle="modal" data-bs-target="#post-modal">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-img">
                                                        <img src={user1} alt="user1" className="avatar-60 rounded-circle img-fluid" />
                                                    </div>
                                                    <input data-bs-toggle="modal" onClick={handleShow} type="text" id='description' {...register('description')} value={formData.description} onChange={handleChange} name='description' className="form-control rounded" placeholder="Write something here..." style={{ border: "none" }} />
                                                    <div >{errors.description?.message}</div>
                                                </div>
                                                <hr />
                                                <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img1} alt="icon" className="img-fluid" /> Photo/Video</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img2} alt="icon" className="img-fluid" /> Tag Friend</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img3} alt="icon" className="img-fluid" /> Feeling/Activity</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img4} alt="icon" className="img-fluid" /> Check in</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img5} alt="icon" className="img-fluid" /> Live Video</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                            <img src={img6} alt="icon" className="img-fluid" /> Gif</div>
                                                    </li>
                                                    <li className="col-md-6 mb-3">
                                                        <Form.Control
                                                            as="select"
                                                            name="privacy_code"                                
                                                            onChange={handleChange}
                                                        >
                                                            <option value="2">Public</option>
                                                            <option value="0">Only Me</option>
                                                            <option value="1">Connections</option>
                                                        </Form.Control>
                                                    </li>

                                                </ul>
                                                <hr />
                                                <button type="submit" disabled={isLoading} className="btn btn-primary d-block w-100 mt-3">
                                                {isLoading ? 'Posting...' : 'Post'}
                                                </button>

                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body>
                                        <div className="user-post-data">
                                            <div className="d-flex justify-content-between">
                                                <div className="me-3">
                                                    <img className="rounded-circle img-fluid" src={user01} alt="" />
                                                </div>
                                                <div className="w-100">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="mb-0 d-inline-block">Anna Sthesia</h5>
                                                            <span className="mb-0 ps-1 d-inline-block">Add New Post</span>
                                                            <p className="mb-0 text-primary">Just Now</p>
                                                        </div>
                                                        <div className="card-post-toolbar">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="bg-transparent">
                                                                    <span className="material-symbols-outlined">
                                                                        more_horiz
                                                                    </span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <div className="h4 material-symbols-outlined">
                                                                                <i className="ri-save-line"></i>
                                                                            </div>
                                                                            <div className="data ms-2">
                                                                                <h6>Save Post</h6>
                                                                                <p className="mb-0">Add this to your saved items</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-close-circle-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Hide Post</h6>
                                                                                <p className="mb-0">See fewer posts like this.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-user-unfollow-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Unfollow User</h6>
                                                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-notification-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Notifications</h6>
                                                                                <p className="mb-0">Turn on notifications for this post</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        </div>
                                        <div className="user-post">
                                            <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                                                <div className="row-span-2 row-span-md-1">
                                                    <img src={p2} alt="post1" className="img-fluid rounded w-100" />
                                                </div>
                                                <div className="row-span-1">
                                                    <img src={p1} alt="post2" className="img-fluid rounded w-100" />
                                                </div>
                                                <div className="row-span-1 ">
                                                    <img src={p3} alt="post3" className="img-fluid rounded w-100" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment-area mt-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="like-block position-relative d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="like-data">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} >
                                                                    <img src={icon1} className="img-fluid" alt="" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className=" py-2">
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="total-like-block ms-2 me-3">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    140 Likes
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="total-comment-block">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                20 Comment
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                <Dropdown.Item href="#">Other</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <ShareOffcanvas />
                                            </div>
                                            <hr />
                                            <ul className="post-comments list-inline p-0 m-0">
                                                <li className="mb-2">
                                                    <div className="d-flex">
                                                        <div className="user-img">
                                                            <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Monty Carlo</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="user-img">
                                                            <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Paul Molive</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <form className="comment-text d-flex align-items-center mt-3" >
                                                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                <div className="comment-attagement d-flex">
                                                    <Link to="#"><i className="ri-link me-3"></i></Link>
                                                    <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                                    <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="user-post-data">
                                            <div className="d-flex justify-content-between">
                                                <div className="me-3">
                                                    <img className="rounded-circle img-fluid" src={user3} alt="" />
                                                </div>
                                                <div className="w-100">
                                                    <div className="d-flex  justify-content-between">
                                                        <div>
                                                            <h5 className="mb-0 d-inline-block">Barb Ackue</h5>
                                                            <span className="mb-0 ps-1 d-inline-block">Added New Image in a Post</span>
                                                            <p className="mb-0 text-primary">1 hour ago</p>
                                                        </div>
                                                        <div className="card-post-toolbar">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="bg-transparent">
                                                                    <span className="material-symbols-outlined">
                                                                        more_horiz
                                                                    </span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <div className="h4">
                                                                                <i className="ri-save-line"></i>
                                                                            </div>
                                                                            <div className="data ms-2">
                                                                                <h6>Save Post</h6>
                                                                                <p className="mb-0">Add this to your saved items</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-close-circle-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Hide Post</h6>
                                                                                <p className="mb-0">See fewer posts like this.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-user-unfollow-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Unfollow User</h6>
                                                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-notification-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Notifications</h6>
                                                                                <p className="mb-0">Turn on notifications for this post</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        </div>
                                        <div className="user-post">
                                            <Link to="#"><img src={p4} alt="post1" className="img-fluid rounded w-100" /></Link>
                                        </div>
                                        <div className="comment-area mt-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="like-block position-relative d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="like-data">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} >
                                                                    <img src={icon1} className="img-fluid" alt="" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className=" py-2">
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="total-like-block ms-2 me-3">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    140 Likes
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="total-comment-block">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                20 Comment
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                <Dropdown.Item href="#">Other</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <ShareOffcanvas />
                                            </div>
                                            <hr />
                                            <ul className="post-comments list-inline p-0 m-0">
                                                <li className="mb-2">
                                                    <div className="d-flex ">
                                                        <div className="user-img">
                                                            <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Monty Carlo</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex ">
                                                        <div className="user-img">
                                                            <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Paul Molive</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <form className="comment-text d-flex align-items-center mt-3" >
                                                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                <div className="comment-attagement d-flex">
                                                    <Link to="#"><i className="ri-link me-3"></i></Link>
                                                    <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                                    <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="user-post-data">
                                            <div className="d-flex justify-content-between">
                                                <div className="me-3">
                                                    <img className="rounded-circle img-fluid" src={user4} alt="" />
                                                </div>
                                                <div className="w-100">
                                                    <div className=" d-flex  justify-content-between">
                                                        <div>
                                                            <h5 className="mb-0 d-inline-block">Ira Membrit</h5>
                                                            <p className="mb-0 ps-1 d-inline-block">Update her Status</p>
                                                            <p className="mb-0 text-primary">6 hour ago</p>
                                                        </div>
                                                        <div className="card-post-toolbar">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="bg-transparent">
                                                                    <span className="material-symbols-outlined">
                                                                        more_horiz
                                                                    </span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <div className="h4">
                                                                                <i className="ri-save-line"></i>
                                                                            </div>
                                                                            <div className="data ms-2">
                                                                                <h6>Save Post</h6>
                                                                                <p className="mb-0">Add this to your saved items</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-close-circle-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Hide Post</h6>
                                                                                <p className="mb-0">See fewer posts like this.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-user-unfollow-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Unfollow User</h6>
                                                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-notification-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Notifications</h6>
                                                                                <p className="mb-0">Turn on notifications for this post</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        </div>
                                        <div className="comment-area mt-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="like-block position-relative d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="like-data">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} >
                                                                    <img src={icon1} className="img-fluid" alt="" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className=" py-2">
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="total-like-block ms-2 me-3">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    140 Likes
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="total-comment-block">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                20 Comment
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                <Dropdown.Item href="#">Other</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <ShareOffcanvas />
                                            </div>
                                            <hr />
                                            <ul className="post-comments list-inline p-0 m-0">
                                                <li className="mb-2">
                                                    <div className="d-flex">
                                                        <div className="user-img">
                                                            <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Monty Carlo</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex ">
                                                        <div className="user-img">
                                                            <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Paul Molive</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <form className="comment-text d-flex align-items-center mt-3" >
                                                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                <div className="comment-attagement d-flex">
                                                    <Link to="#"><i className="ri-link me-3"></i></Link>
                                                    <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                                    <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="post-item">
                                            <div className="d-flex justify-content-between">
                                                <div className="me-3">
                                                    <img className="rounded-circle img-fluid avatar-60" src={user1} alt="" />
                                                </div>
                                                <div className="w-100">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="mb-0 d-inline-block">Bni Cyst</h5>
                                                            <p className="ms-1 mb-0 ps-1 d-inline-block">Changed Profile Picture</p>
                                                            <p className="mb-0">3 day ago</p>
                                                        </div>
                                                        <div className="card-post-toolbar">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="bg-transparent">
                                                                    <span className="material-symbols-outlined">
                                                                        more_horiz
                                                                    </span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <div className="h4">
                                                                                <i className="ri-save-line"></i>
                                                                            </div>
                                                                            <div className="data ms-2">
                                                                                <h6>Save Post</h6>
                                                                                <p className="mb-0">Add this to your saved items</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-close-circle-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Hide Post</h6>
                                                                                <p className="mb-0">See fewer posts like this.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-user-unfollow-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Unfollow User</h6>
                                                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-notification-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Notifications</h6>
                                                                                <p className="mb-0">Turn on notifications for this post</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-post text-center">
                                            <Link to="#"><img src={p5} alt="post1" className="img-fluid rounded w-100 mt-3" /></Link>
                                        </div>
                                        <div className="comment-area mt-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="like-block position-relative d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="like-data">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} >
                                                                    <img src={icon1} className="img-fluid" alt="" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className=" py-2">
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="total-like-block ms-2 me-3">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    140 Likes
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="total-comment-block">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                20 Comment
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                <Dropdown.Item href="#">Other</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <ShareOffcanvas />
                                            </div>
                                            <hr />
                                            <ul className="post-comments list-inline p-0 m-0">
                                                <li className="mb-2">
                                                    <div className="d-flex">
                                                        <div className="user-img">
                                                            <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Monty Carlo</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <div className="user-img">
                                                            <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Paul Molive</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <form className="comment-text d-flex align-items-center mt-3" >
                                                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                <div className="comment-attagement d-flex">
                                                    <Link to="#"><i className="ri-link me-3"></i></Link>
                                                    <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                                    <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="user-post-data">
                                            <div className="d-flex justify-content-between">
                                                <div className="me-3">
                                                    <img className="rounded-circle img-fluid" src={user2} alt="" />
                                                </div>
                                                <div className="w-100">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="mb-0 d-inline-block">Paige Turner</h5>
                                                            <p className="mb-0 ps-1 d-inline-block">Added New Video in his Timeline</p>
                                                            <p className="mb-0 text-primary">1 day ago</p>
                                                        </div>
                                                        <div className="card-post-toolbar">
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="bg-transparent">
                                                                    <span className="material-symbols-outlined">
                                                                        more_horiz
                                                                    </span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <div className="h4">
                                                                                <i className="ri-save-line"></i>
                                                                            </div>
                                                                            <div className="data ms-2">
                                                                                <h6>Save Post</h6>
                                                                                <p className="mb-0">Add this to your saved items</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className="p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-close-circle-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Hide Post</h6>
                                                                                <p className="mb-0">See fewer posts like this.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-user-unfollow-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Unfollow User</h6>
                                                                                <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className="ri-notification-line h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Notifications</h6>
                                                                                <p className="mb-0">Turn on notifications for this post</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        </div>
                                        <div className="user-post">
                                            <div className="ratio ratio-16x9">
                                                <iframe title="vedio" src="https://www.youtube.com/embed/j_GsIanLxZk?rel=0" ></iframe>
                                            </div>
                                        </div>
                                        <div className="comment-area mt-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="like-block position-relative d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="like-data">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    <img src={icon1} className="img-fluid" alt="" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className=" py-2">
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt="" /></OverlayTrigger>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="total-like-block ms-2 me-3">
                                                            <Dropdown>
                                                                <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                    140 Likes
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                    <Dropdown.Item href="#">Other</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="total-comment-block">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                20 Comment
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                                                <Dropdown.Item href="#">Other</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <ShareOffcanvas />
                                            </div>
                                            <hr />
                                            <ul className="post-comments list-inline p-0 m-0">
                                                <li className="mb-2">
                                                    <div className="d-flex flex-wrap">
                                                        <div className="user-img">
                                                            <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Monty Carlo</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex flex-wrap">
                                                        <div className="user-img">
                                                            <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                                                        </div>
                                                        <div className="comment-data-block ms-3">
                                                            <h6>Paul Molive</h6>
                                                            <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                <Link to="#">like</Link>
                                                                <Link to="#">reply</Link>
                                                                <Link to="#">translate</Link>
                                                                <span> 5 min </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <form className="comment-text d-flex align-items-center mt-3">
                                                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                <div className="comment-attagement d-flex">
                                                    <Link to="#"><i className="ri-link me-3"></i></Link>
                                                    <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                                    <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Trending Topics</h4>
                                    </div>
                                </div>
                                <Card.Body>
                                    <ul className="media-story list-inline m-0 p-0">
                                        {/* <li className="d-flex mb-3 align-items-center">
                                        <i className="ri-add-line"></i>
                                        <div className="stories-data ms-3">
                                            <h5>Creat Your Story</h5>
                                            <p className="mb-0">time to story</p>
                                        </div>
                                    </li> */}
                                        <li className="d-flex mb-3 align-items-center active">
                                            <img src={s2} alt="story-img" className="rounded-circle img-fluid" />
                                            <div className="stories-data ms-3">
                                                <h5>Anna Mull</h5>
                                                <p className="mb-0">1 hour ago</p>
                                            </div>
                                        </li>
                                        <li className="d-flex mb-3 align-items-center">
                                            <img src={s3} alt="story-img" className="rounded-circle img-fluid" />
                                            <div className="stories-data ms-3">
                                                <h5>Ira Membrit</h5>
                                                <p className="mb-0">4 hour ago</p>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <img src={s1} alt="story-img" className="rounded-circle img-fluid" />
                                            <div className="stories-data ms-3">
                                                <h5>Bob Frapples</h5>
                                                <p className="mb-0">9 hour ago</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <Link to="#" className="btn btn-primary d-block mt-3">See All</Link>
                                </Card.Body>
                            </Card>

                            <Card>
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Upcoming Birthday</h4>
                                    </div>
                                </div>
                                <Card.Body>
                                    <ul className="media-story list-inline m-0 p-0">
                                        <li className="d-flex mb-4 align-items-center">
                                            <img src={user01} alt="story3" className="rounded-circle img-fluid" />
                                            <div className="stories-data ms-3">
                                                <h5>Anna Sthesia</h5>
                                                <p className="mb-0">Today</p>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <img src={user2} alt="story-img" className="rounded-circle img-fluid" />
                                            <div className="stories-data ms-3">
                                                <h5>Paul Molive</h5>
                                                <p className="mb-0">Tomorrow</p>
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>

                        </Col>
                        <div className="col-sm-12 text-center">
                            <img src={loader} alt="loader" style={{ height: "100px" }} />
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Index
