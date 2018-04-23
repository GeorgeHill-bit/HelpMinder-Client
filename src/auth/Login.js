import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            errmsg: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/api/login", {
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data.message)
            if (data.message !== "User logged in successfully.") {
                let msg = '"Problem with Username: "'+this.state.username+'", '+data.error;
                this.handleLoginError(msg)
            } else {
                this.props.setToken(data.sessionToken, this.state.username)
            }
        })
    }

    handleLoginError = (msg) => {
        this.setState({
            errmsg: msg
        })
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li-username" name="username" type="text" placeholder="enter username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="li-email" name="email" type="text" placeholder="enter email address" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup color="red">
                        <Label for="password">Password</Label>
                        <Input id="li-password" name="password"type="password" placeholder="enter password" onChange={this.handleChange}/>
                        <br />
                        <Button id="li-Button">Submit</Button>
                    </FormGroup>
                </Form>
                <p>{this.state.errmsg}</p>
            </div>

        )
    }
}

export default Login