// EitemEdit.js
import React from 'react';
import { Button, Form, Input, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class EitemEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            event: '',
            due: '',
            freq: '',
            owner: '',
            location: '',
            purpose: '',
            modal: false,
            backdrop: true
        };
        this.toggle = this.toggle.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        console.log("EitemEdit invoked.");
    }

    componentWillMount() {
        console.log("componentWillMount invoked.")
        this.setState({ 
            id: this.setState.id,
            category: this.setState.category,
            event: this.setState.event,
            due: this.setState.due,
            freq: this.setState.freq,
            owner: this.setState.owner,
            location: this.setState.location,
            purpose: this.setState.purpose,
            createdAt: this.setState.createdAt,
            updatedAt: this.setState.updatedAt
        })
        console.log(this.setState)
    }
   
    toggle() {
        this.setState({
        modal: !this.state.modal
        })
    }

    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
        value = JSON.parse(value)
        }
        this.setState({ backdrop: value });
    }

    handleChange = (event) => { 
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handleCancel = (event) => { 
    //     console.log("handleCancel invoked.")
    //     this.setState({
    //         modal: false,
    //     })
    // }

    handleCreate = (event, eitem) => { 
        event.preventDefault();
        let logData = {
            id: this.setState.id,
            category: this.setState.category,
            event: this.setState.event,
            due: this.setState.due,
            freq: this.setState.freq,
            owner: this.setState.owner,
            location: this.setState.location,
            purpose: this.setState.purpose
        }
        console.log("handleCreate invoked."+logData)
        this.props.create(event, logData)
    }
   
    handleUpdate = (event, eitem) => { 
        event.preventDefault();
        console.log("handleUpdate invoked. "+this.props.eitem)
        let logData = this.prop
        this.props.update(event, this.props.eitem)
    } 
    render() {
        if (this.props.updateFlag === true) {
            return (
                <div>
                    <Modal isOpen={true} className="modal-eitemUpdate">
                        <ModalHeader >Update an Event</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleUpdate} >
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Category:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="category" id="category" value={this.state.category} placeholder="enter category" onChange={this.handleChange} >
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
                                    <Input id="event" type="text" name="event" value={this.state.event} placeholder="enter event" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Date due:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="due" type="text" name="due" value={this.state.due} placeholder="enter date due" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Frequency:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="freq" id="freq" value={this.state.freq} placeholder="Once" onChange={this.handleChange} >
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
                                    <Input id="owner" type="text" name="owner" value={this.state.owner} placeholder="enter owner" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Location:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="location" type="text" name="location" value={this.state.location} placeholder="enter location" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Purpose:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="purpose" type="text" name="purpose" value={this.state.purpose} placeholder="enter purpose" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Created:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="created" readOnly type="text" name="created" value={this.state.createdAt} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Updated:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="updated" readOnly type="text" name="updated" value={this.state.updatedAt} />
                                </InputGroup>
                                <br />
                                <ModalFooter>        
                                    <Button type="button" onClick={this.handleCancel} color="primary"> Cancel </Button>
                                    <Button type="button" onClick={e => this.handleUpdate(e, this.state)} color="primary"> Update Event </Button>
                                </ModalFooter>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        } else if (this.props.createFlag === true) {
            return (
                <div>
                    <Modal isOpen={true} className="modal-eitemCreate">
                        <ModalHeader >Create an Event</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleCreate} >
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
                                <ModalFooter>        
                                    <Button type="button" onClick={this.handleCancel} color="primary"> Cancel </Button>
                                    <Button type="button" onClick={e => this.handleCreate(e, this.state)} color="primary"> Create Event </Button>
                                </ModalFooter>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        } else {
            return (<div></div>);
        }
    }
}

export default EitemEdit;
