import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            emailaddr: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then( data => this.props.setToken(data.sessionToken, this.state.username))
        event.preventDefault()
    }

    render() {
        return(
            <div>
                <h1>Signup</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="su-username" name="username" type="text" placeholder="Enter username" onChange={this.handleChange} required />
                        {/* <FormFeedback>Enter a valid username (6 character minimum)</FormFeedback> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailaddr">Email Address</Label>
                        <Input id="su-emailaddr" name="mailaddr" type="text" placeholder="Enter email address" onChange={this.handleChange} required />
                        {/* <FormFeedback>Enter a valid email(xxxxx@xxxxxxx.com)</FormFeedback> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="su-password" name="password" type="password" placeholder="Enter password" onChange={this.handleChange} required />
                        {/* <FormFeedback>Enter a valid password (6 character minimum)</FormFeedback> */}
                    </FormGroup>
                    <br />
                    <Button id="su-Button">Submit</Button>
                </Form>
            </div> 
        )
    }
}

export default Signup