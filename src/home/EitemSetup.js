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
        console.log("componentWillMount")
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

    // cancelCreate = (e) => {
    //     console.log("cancelCreate - "+this.state)
    //     this.setState({
    //         modal: false,
    //         createPressed: false
    //     })
    // }

    updateCancel = (e) => {
        this.setState({
            eitem: '',
            updatePressed: false,
            modal: false
        })
    }

    eitemCreate = (event) => {
        console.log("eitemCreate invoked.")
        this.setState({
            updatePressed: false,
            createPressed: true,
            modal: true
        })
    }

    eitemUpdate = (event, eitem) => {
        event.preventDefault();
        console.log("eitemUpdate invoked.")
        this.setState({
            eitem: eitem,
            createPressed: false,
            updatePressed: true,
            modal: true
        })
        this.fetchEitems();
    }

    eitemDelete = (event, eitem) => {
        // event.preventDefault();
        console.log("eitemDelete invoked. "+eitem.id)
        fetch("http://localhost:3000/api/log/"+eitem.id, {
            method: 'DELETE',
            body: JSON.stringify({ log: eitem }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token 
            })
        })
            .then((res) => {
                // this.setState({ updatePressed: false })
                this.fetchEitems(); 
            })
    }

    render () {
        {console.log(this.state)}
        return( 
            <Container className="auth-container">
                <Row>
                    <Col md="12" className="event-table"> 
                        {(this.state.createPressed || this.state.eitems < 1 ) ?
                        <EitemCreate 
                            token={this.props.token}
                            create={this.EitemCreate} 
                            updateEitemsArray={this.fetchEitems} 
                        /> 
                        : (this.state.updatePressed) ?
                        <EitemUpdate 
                            updateCancel={this.updateCancel}
                            token={this.props.token} 
                            eitem={this.state.eitem}
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