import React, { Component } from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

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
                        <Label for="firstname">First name</Label>
                        <Input type="text" name="firstname" value={this.state.firstname} invalid={!this.state.firstnameValid} placeholder="Enter first name" onChange={this.handleChange} required />
                        <FormFeedback>Enter a valid first name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Last name</Label>
                        <Input type="text" name="lastname" value={this.state.lastname} invalid={!this.state.lastnameValid} placeholder="Enter last name" onChange={this.handleChange} required />
                        <FormFeedback>Enter a valid last name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" value={this.state.username} invalid={!this.state.usernameValid} placeholder="Enter username" onChange={this.handleChange} required />
                        <FormFeedback>Enter a valid username (6 character minimum)</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailaddr">Email Address</Label>
                        <Input type="text" name="emailaddr" value={this.state.emailaddr} invalid={!this.state.emailaddrValid} placeholder="Enter email address" onChange={this.handleChange} required />
                        <FormFeedback>Enter a valid email(xxxxx@xxxxxxx.com)</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" value={this.state.password} invalid={!this.state.passwordValid} placeholder="Enter password" onChange={this.handleChange} required />
                        <FormFeedback>Enter a valid password (6 character minimum)</FormFeedback>
                    </FormGroup>
                    <br />
                    <Button id="su-Button">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Signup