import React, { Component } from 'react';
import NewAddressForm from './NewAddressForm'
import {
    th,
    Table,
    thead,
    tr,
} from 'react-bootstrap';


class AddressBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newStreet: '',
            newCity: '',
            newState: '',
            newZip: ''
        };
    }

componentDidMount = () => {
    // console.log('addressbook:', this.props.userID)
    // console.log('addressbook:', this.props.thing)
}  

    render() {
        const tableBody = this.props.list.map((val, i) => {
            return (
                <tr>
                    <td>{i + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.street}</td>
                    <td>{val.city} </td>
                    <td>{val.state} </td>
                    <td>{val.zipcode} </td>
                </tr>
            );
        });

        return (
            <div>
                <Table responsive striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
                <br />
                <br />
                <NewAddressForm userID={this.props.userID}/>
            </div>
        );

    }

}

export default AddressBook;