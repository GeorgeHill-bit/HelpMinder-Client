import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class EitemUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            id: '',
            category: '',
            event: '',
            due: '',
            freq: '',
            owner: '',
            location: '',
            purpose: '',
            createdAt: '',
            updatedAt: ''

        };
    }
 
    componentWillMount() {
        // console.log("componentWillMount")
        this.setState({
            id: this.props.eitem.id,
            category: this.props.eitem.category,
            event: this.props.eitem.event,
            due: this.props.eitem.due,
            freq: this.props.eitem.freq,
            owner: this.props.eitem.owner,
            location: this.props.eitem.location,
            purpose: this.props.eitem.purpose,
            createdAt: this.props.eitem.createdAt,
            updatedAt: this.props.eitem.updatedAt,
            modal: true
            });
    
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

    // handleCancel = () => {
    //     this.setState({
    //         modal: false,
    //         updatePressed: false
    //     })
    // }

    handleUpdate = (event) => { 
        event.preventDefault();
        // console.log("EitemUpdate invoked. "+this.state.id)
        fetch("http://localhost:3000/api/log/"+this.state.id, {
            method: 'PUT',
            body: JSON.stringify({ log: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token 
            })
        })
        .then((res) => {
            this.setState({ 
                updatePressed: false, 
                modal: false
            })
            this.props.updateEitemsArray()
            this.props.updateSuccess()
        })
    }

    render() {
        // console.log(this.props, this.state)
        return (
            <div>
            <Modal isOpen={this.props.modal}>
            <form onSubmit={this.handleUpdate}>
            <ModalHeader>Update Event</ModalHeader>
            <ModalBody>
            <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Event #:</InputGroupText>
                    </InputGroupAddon>
                    <Input id="id" readOnly type="text" name="id" value={this.state.id}/>
                </InputGroup>

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
                    <Input id="due" type="text" name="due" value={this.state.due.substr(0,10)} placeholder="enter date due" onChange={this.handleChange} />
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
            </ModalBody>
            <ModalFooter>
                <Button type="submit" size="sm" color="primary">Update Event</Button>
                <Button size="sm" color="warning" onClick={this.props.updateCancel}>Cancel</Button>
            </ModalFooter>
            </form>
            </Modal>
            </div>
        )
    }
}

export default EitemUpdate;