import React from 'react';
import EitemSetup from '../home/EitemSetup';
// import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';

const Splash = (props) => {
    // console.log(props)
    return (
        <div>
            <EitemSetup token = {props.token}/>
        </div>
    )
}

export default Splash;