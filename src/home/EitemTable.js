import React from 'react';
import { Table, Button } from 'reactstrap';
import EitemUpdate from './EitemUpdate';

class EitemTable extends React.Component {
    constructor(props) {
    super(props)
        this.state = {
            eitems: [],
            eitem: {},
            createPressed: false,
            updatePressed: false,
        }
    }

    // componentWillMount() {
    //     console.log("componentWillMount")
    // }

    update(e, eitem) {
        // console.log("EitemTable - update")
        this.setState({
            eitem: eitem,
            updatePressed: true        
        });
        return (
            <div>
            <EitemUpdate update={this.eitem} 
            />
            </div>
        );
    }

    render() {
        // console.log(this.props,this.state) 
        return (
            <div>
                <h3>Event History</h3>
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th width="150">Category</th>
                            <th width="250">Event</th>
                            <th width="150">DateDue</th>
                            <th width="150">Frequency</th>
                            <th width="150">Owner</th>
                            <th width="150">Location</th>
                            <th width="150">Purpose</th>
                            <th width="150">Created</th>
                            <th width="150">Updated</th>
                            <td><Button id="create" onClick={e => this.props.create(e)} size="sm" color="primary">Create</Button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.eitems.map((eitem, id) => { 
                                return ( 
                                    <tr key={eitem.id}> 
                                        {/* <th scope="row">{eitem.id}</th> */}
                                        <td>{eitem.id}</td>
                                        <td>{eitem.category}</td>
                                        <td>{eitem.event}</td>
                                        <td>{eitem.due.substr(0,10)}</td>
                                        <td>{eitem.freq}</td>
                                        <td>{eitem.owner}</td>
                                        <td>{eitem.location}</td>
                                        <td>{eitem.purpose}</td>
                                        <td>{eitem.createdAt.substr(0,10)}</td>
                                        <td>{eitem.updatedAt.substr(0,10)}</td>
                                        <td><Button id={eitem.id} onClick={e => this.props.update(e, eitem)} size="sm" color="primary">Update</Button></td>
                                        <td><Button id={eitem.id} onClick={e => this.props.delete(e, eitem)} size="sm" color="warning">Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default EitemTable;