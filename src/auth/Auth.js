import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';


const Auth = (props) => {
    console.log(props)
    return( 
        <Container className="auth-container">
            <Row>
                <Col md="3" className="signin-col">
                    <Signup setToken={props.setToken} />
                </Col>
                <Col md="3" ></Col>
                <Col md="3" className="login-col">
                    <Login setToken={props.setToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth; 