import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import moment from 'moment';
const UserAccountSetting = () => {
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
                                    <Form>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="uname" className="form-label">First Name:</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="text" className="form-control" placeholder='Enter First Name' name="first_name" id="first_name" defaultValue="" />
                                                </Col>
                                                <Col lg="2" md="2" sm="2">
                                                    <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="uname" className="form-label">Last Name:</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="text" className="form-control" placeholder='Enter Last Name' name="last_name" id="last_name" defaultValue="" />
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
                                                        <option>Select Gender</option>
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
                                            <Form.Label htmlFor="gender">Date of Birth</Form.Label>
                                            <Row>
                                                <Col lg="3" md="3" sm="3">
                                                    <Form.Control
                                                        as="select"
                                                        name="year"
                                                    //    value={formData.year}
                                                    //    onChange={handleChange}
                                                    >
                                                        <option selected value="">Year</option>
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
                                                        <option selected value="">Month</option>
                                                        {monthOptions}
                                                    </Form.Control>
                                                </Col>
                                                <Col lg="3" md="3" sm="3">
                                                    <Form.Control
                                                        as="select"
                                                        name="day"
                                                    //    value={formData.day}
                                                    //    onChange={handleChange}
                                                    >
                                                        <option selected value="">Day</option>
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
                                            <Form.Label htmlFor="mobile" className="form-label">Mobile:</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="text" placeholder='Enter Last Mobile' className="form-control" id="mobile" defaultValue="" />
                                                </Col>
                                                <Col lg="3" md="3" sm="3">
                                                    <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="mobile" className="form-label">Nickname:</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="text" placeholder='Enter Last Nickname' className="form-control" name='nickname' id="nickname" defaultValue="" />
                                                </Col>
                                                <Col lg="3" md="3" sm="3">
                                                    <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="mobile" className="form-label">About:</Form.Label>
                                            <Row>
                                                <Col lg="9" md="9" sm="9">
                                                    <Form.Control type="text" placeholder='Enter Last About' className="form-control" name='about' id="about" defaultValue="" />
                                                </Col>
                                                <Col lg="3" md="3" sm="3">
                                                    <Button type="button" className="btn btn-primary me-2">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                    </Form>
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