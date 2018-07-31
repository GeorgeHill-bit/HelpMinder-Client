import React, { Component } from "react";
import { FormGroup, FormFeedback, Label,  Button } from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class Register extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            password: '',
            firstnameValid: true,
            lastnameValid: true,
            usernameValid: true,
            emailaddrValid: true, 
            passwordValid: true
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, 
            () => {
                this.validateField(name, value)
            });
    }

    validateField(fieldName, value) {

        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let usernameValid = this.state.usernameValid;
        let emailaddrValid = this.state.emailaddrValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'firstname':
                firstnameValid = value.length >= 1;
                break;
            case 'lastname':
                lastnameValid = value.length >= 1;
                break;
            case 'username':
                usernameValid = value.length >= 6;
                break;
            case 'emailaddr':
                emailaddrValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case 'password':
                passwordValid = value.length >= 6;
                break;
            default:
                break;
        }

        this.setState({
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid,
            usernameValid: usernameValid, 
            emailaddrValid: emailaddrValid,
            passwordValid: passwordValid
        });
    }

    handleSubmit = (event) => {
        console.log("Signup submitted")
        if (this.state.usernameValid && this.state.emailaddrValid && this.state.passwordValid) {
            fetch("http://localhost:3000/api/user", {
                method: 'POST',
                body: JSON.stringify({ user: this.state }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                this.props.setToken(data.sessionToken)
            })
        }
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h2>Signup for account</h2>
                <Form onSubmit={this.handleSubmit} >
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
                    <Button type="submit" color="secondary">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Register;
