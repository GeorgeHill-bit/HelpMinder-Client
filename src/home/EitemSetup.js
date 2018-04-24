import React from 'react';
import EitemTable from './EitemTable';
import EitemCreate from './EitemCreate';
import EitemUpdate from './EitemUpdate';
import { Container, Row, Col } from 'reactstrap';

class EitemSetup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eitems: [],
            eitem: {},
            createPressed: false,
            updatePressed: false
        }
    }
    
    componentWillMount() {
        // console.log("componentWillMount")
        this.fetchEitems()
    }


    fetchEitems = () => {
        fetch("http://localhost:3000/api/log/", {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ eitems: logData })
        })
    }

    eitemCreate = (event) => {
        // console.log("eitemCreate invoked.")
        this.setState({
            updatePressed: false,
            createPressed: true,
            modal: true
        })
        this.fetchEitems();
    }

    createCancel = (event) => {
        event.preventDefault();  
        this.setState({
            createPressed: false,
            modal: false
        })
    }

    createSuccess = (event) => {
        this.setState({
            createPressed: false,
            modal: false
        })
    }

    eitemUpdate = (event, eitem) => {
        event.preventDefault();
        // console.log("eitemUpdate invoked.")
        this.setState({
            eitem: eitem,
            createPressed: false,
            updatePressed: true,
            modal: true
        })
        this.fetchEitems();
    }

    updateCancel = (event) => {
        event.preventDefault();
        this.setState({
            eitem: '',
            updatePressed: false,
            modal: false
        })
    }

    updateSuccess = (event) => {
        this.setState({
            eitem: '',
            updatePressed: false,
            modal: false
        })
    }

    eitemDelete = (event, eitem) => {
        // event.preventDefault();
        // console.log("eitemDelete invoked. "+eitem.id)
        fetch("http://localhost:3000/api/log/"+eitem.id, {
            method: 'DELETE',
            body: JSON.stringify({ log: eitem }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token 
            })
        })
            .then((res) => {
                this.setState({ createPressed: false })
                this.fetchEitems(); 
            })
    }

    render () {
        // {console.log(this.state)}
        return( 
            <Container className="auth-container">
                <Row>
                    <Col md="12" className="event-table"> 
                        {(this.state.createPressed || this.state.eitems < 1 ) ?
                        <EitemCreate  
                            createCancel={this.createCancel}
                            createSuccess={this.createSuccess}
                            token={this.props.token}
                            eitems={this.state.eitems} 
                            create={this.EitemCreate} 
                            updateEitemsArray={this.fetchEitems}
                            createPressed={this.state.createPressed}
                            modal={this.state.modal}
                        /> 
                        : (this.state.updatePressed) ?
                        <EitemUpdate 
                            updateCancel={this.updateCancel}
                            updateSuccess={this.updateSuccess}
                            token={this.props.token} 
                            eitem={this.state.eitem}
                            updateEitemsArray={this.fetchEitems}
                            updatePressed={this.state.updatePressed}
                            modal={this.state.modal}
                        /> 
                        : <div></div> }
                        <EitemTable 
                            eitems={this.state.eitems} 
                            eitem={this.eitem}
                            delete={this.eitemDelete} 
                            create={this.eitemCreate}
                            update={this.eitemUpdate}
                        /> 
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EitemSetup; 