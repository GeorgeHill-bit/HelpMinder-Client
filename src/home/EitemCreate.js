import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class EitemCreate extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        }

    componentWillMount() {
        // console.log("componentWillMount")
        this.setState({
            modal: true
            })
        }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
        }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreate = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/log/`, {
            method: 'POST',
            body: JSON.stringify({ log: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            this.setState({ 
                createPressed: false,
                modal: false 
            })
            this.props.updateEitemsArray()
            this.props.createSuccess()
        })
    }

  render() {
    //   console.log(this.props, this.state)
    return (
        <div>
        {/* <Button size="sm" color="success" onClick={this.toggle}>Create New Event</Button> */}
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleCreate}>
        <ModalHeader>Create event</ModalHeader>
        <ModalBody>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Category:</InputGroupText>
                </InputGroupAddon>
                <Input id="category" type="select" name="category" placeholder="enter category" onChange={this.handleChange} >
                    <option></option>
                    <option value="Home">Home</option>
                    <option value="Finance">Finance</option>
                    <option value="Car">Car</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Event:</InputGroupText>
                </InputGroupAddon>
                <Input id="event" type="text" name="event" placeholder="enter event" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Date due:</InputGroupText>
                </InputGroupAddon>
                <Input id="due" type="text" name="due" placeholder="enter date due" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Frequency:</InputGroupText>
                </InputGroupAddon>
                <Input id="freq" type="select" name="freq" placeholder="Once" onChange={this.handleChange} >
                    <option></option>
                    <option value="Once">Once</option>
                    <option value="Annually">Annually</option>
                    <option value="Semiannually">Semiannually</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Owner:</InputGroupText>
                </InputGroupAddon>
                <Input id="owner" type="text" name="owner" placeholder="enter owner" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Location:</InputGroupText>
                </InputGroupAddon>
                <Input id="location" type="text" name="location" placeholder="enter location" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Purpose:</InputGroupText>
                </InputGroupAddon>
                <Input id="purpose" type="text" name="purpose" placeholder="enter purpose" onChange={this.handleChange} />
            </InputGroup>
            <br />
        </ModalBody>
        <ModalFooter>
            <Button type="submit" size="sm" color="primary">Create Event</Button>
            <Button type="button" size="sm" color="warning" onClick={this.props.createCancel}>Cancel</Button>
        </ModalFooter>
        </form>
        </Modal>
        </div>
    );
  }
}

export default EitemCreate;