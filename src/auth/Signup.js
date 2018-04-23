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
                        <Input id="su-username" name="username" type="text" placeholder="enter username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="su-email" name="email" type="text" placeholder="enter email address" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="su-password" name="password" type="password" placeholder="enter password" onChange={this.handleChange}/>
                        <br />
                        <Button id="su-Button">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Signup