import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap'
import moment from 'moment';
const UserAccountSetting =() =>{
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

  return(
     <>
        <Container>
        <Row>
            <Col lg="6">
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
                                <Form.Label htmlFor="uname" className="form-label">Title:</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder='Enter Title' name="title" id="title" defaultValue=""/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="uname" className="form-label">First Name:</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder='Enter First Name' name="first_name" id="first_name" defaultValue=""/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="uname" className="form-label">Last Name:</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder='Enter Last Name' name="last_name" id="last_name" defaultValue=""/>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Gender</Form.Label>
                              <select className="form-select" id="gender" name='gender'>
                                 <option>Select Gender</option>
                                 <option>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Date of Birth</Form.Label>
                              <Row>
                                 <Col>
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
                                 <Col>
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
                                 <Col>
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
                              </Row>
                              {/* <div >{errors.gender?.message}</div> */}
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Marital Status</Form.Label>
                              <select className="form-select" id="marital_status" name='marital_status'>
                                 <option>Select Marital Status</option>
                                 <option>Married</option>
                                 <option>Unmarried</option>
                                 <option>Other</option>
                              </select>
                           </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="mobile" className="form-label">Mobile:</Form.Label>
                                <Form.Control type="text" placeholder='Enter Last Mobile' className="form-control" id="mobile" defaultValue=""/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="mobile" className="form-label">Nickname:</Form.Label>
                                <Form.Control type="text" placeholder='Enter Last Nickname' className="form-control" name='nickname' id="nickname" defaultValue=""/>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="gender">Religion</Form.Label>
                              <select className="form-select" id="marital_status" name='marital_status'>
                                 <option>Select Religion</option>
                                 <option>Islam</option>
                                 <option>Hindu</option>
                                 <option>Christian</option>
                                 <option>Other</option>
                              </select>
                           </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="mobile" className="form-label">About:</Form.Label>
                                <Form.Control type="text" placeholder='Enter Last About' className="form-control" name='about' id="about" defaultValue=""/>
                            </Form.Group>
                            {/* <Form.Group className="form-group">
                                <Form.Label className="d-block form-label">Language Known:</Form.Label>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="english" defaultChecked/>
                                    <Form.Check.Label className="form-check-label" htmlFor="english">English</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="french" defaultChecked/>
                                    <Form.Check.Label className="form-check-label" htmlFor="french">French</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="hindi"/>
                                    <Form.Check.Label className="form-check-label" htmlFor="hindi">Hindi</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="spanish" defaultChecked/>
                                    <Form.Check.Label className="form-check-label" htmlFor="spanish">Spanish</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="arabic"/>
                                    <Form.Check.Label className="form-check-label" htmlFor="arabic">Arabic</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                    <Form.Check.Input type="checkbox" className="form-check-input" id="italian"/>
                                    <Form.Check.Label className="form-check-label" htmlFor="italian">Italian</Form.Check.Label>
                                </Form.Check>
                            </Form.Group> */}
                            <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                        </Form>
                    </div>
                </Card.Body>
                </Card>
            </Col>
            <Col lg="6">
                <Card>
                <Card.Header className="card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">Social Media</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="acc-edit">
                        <Form>
                            <Form.Group className="form-group">
                                <Form.Label htmlFor="facebook" className="form-label">Facebook:</Form.Label>
                                <Form.Control type="text" className="form-control" id="facebook" defaultValue="www.facebook.com"/>
                            </Form.Group>
                            <Form.Group className="form-group">
                            <Form.Label htmlFor="twitter" className="form-label">Twitter:</Form.Label>
                            <Form.Control type="text" className="form-control" id="twitter" defaultValue="www.twitter.com"/>
                            </Form.Group>
                            <Form.Group className="form-group">
                            <Form.Label htmlFor="google" className="form-label">Google +:</Form.Label>
                            <Form.Control type="text" className="form-control" id="google" defaultValue="www.google.com"/>
                            </Form.Group>
                            <Form.Group className="form-group">
                            <Form.Label htmlFor="instagram" className="form-label">Instagram:</Form.Label>
                            <Form.Control type="text" className="form-control" id="instagram" defaultValue="www.instagram.com"/>
                            </Form.Group>
                            <Form.Group className="form-group">
                            <Form.Label htmlFor="youtube" className="form-label">You Tube:</Form.Label>
                            <Form.Control type="text" className="form-control" id="youtube" defaultValue="www.youtube.com"/>
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                        </Form>
                    </div>
                </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
     </>
  )

}

export default UserAccountSetting;