import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';


const Auth = (props) => {
    // console.log(props)
    return( 
        <Container className="auth-container">
            <Row>
                <br />
                <br />
                <br />
                <br />
                <br />
            </Row>
            <Row>
                <Col md="1" ></Col>
                <Col md="5" className="signin-col">
                    <Signup setToken={props.setToken} />
                </Col>
                <Col md="1" ></Col>
                <Col md="5" className="login-col">
                    <Login setToken={props.setToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth; 