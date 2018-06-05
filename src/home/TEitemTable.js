import React from 'react';
import { Table, Button } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn, InsertButton, onClick } from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import './react-bootstrap-table-all.min.css';
import EitemUpdate from './EitemUpdate';

class EitemTable extends React.Component {
    constructor(props) {
    super(props)
        this.state = {
            products: '',
            eitems: [],
            eitem: {},
            createPressed: false,
            updatePressed: false,
        }
    }

    componentWillMount() {
        console.log("componentWillMount")
    }

    update(e, eitem) {
        console.log("EitemTable - update")
        this.setState({
            eitem: eitem,
            updatePressed: true        
        });
        return (
            <div>
            <EitemUpdate update={this.eitem} />
            </div>
        );
    }

    render() {
        console.log(this.props,this.state) 
        return (
        <div>
            <h3>Event History</h3>
            <BootstrapTable data={ this.props.eitems } version='4' 
                height='120' scrollTop={ '8' }
                hover bordered= { false } 
                options={ { noDataText: 'This is custom text for empty data' } } >
                <TableHeaderColumn width="150" dataField="id" isKey>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="category">Category</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="event">Event</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="due">DateDue</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="freq">Frequency</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="owner">Owner</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="location">Location</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="purpose">Purpose</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="createdAt">Created</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="updatedAt">Updated</TableHeaderColumn>
                {/* <InsertButton
                    btnText='Update event'
                    btnContextual='btn-primary'
                    className='update-button'
                    btnGlyphicon='glyphicon-edit'
                    onClick={ (e, id) => this.props.update(onClick) } />
                <InsertButton
                    btnText='Delete'
                    btnContextual='btn-warning'
                    className='delete-button'
                    btnGlyphicon='glyphicon-edit'
                    onClick={ (e, id) => this.props.delete(onClick) } /> */}
                <td><Button id={this.state.id} onClick={e => this.props.update(e, this.state.eitem)} size="sm" color="primary">Update</Button></td>
                <td><Button id={this.state.id} onClick={e => this.props.delete(e, this.state.eitem)} size="sm" color="warning">Delete</Button></td>
                {console.log(this.state.eitem)}
            </BootstrapTable>
        </div>
        );
    }
}

export default EitemTable;