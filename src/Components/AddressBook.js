import React, { Component } from 'react';
import {
    th,
    Table,
    thead,
    tr,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default ({ list }) => {
    const tableBody = list.map((val, i) => {
        return (
            <tr>
                <td>{i + 1}</td>
                <td>{val.name}</td>
                <td>{val.street}</td>
                <td>{val.city} </td>
                <td>{val.state} </td>
                <td>{val.zipcode} </td>
                <td>{val.email} </td>
                <Button bsSize="small">
                    <Link
                        to={{
                            pathname: `/contacts/edit/${val._id}`
                        }}
                    >
                        <Glyphicon glyph="pencil" />
                    </Link>
                </Button>
                <Button bsSize="small">
                    <Glyphicon glyph="trash" />
                </Button>
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
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
            <br />
            <br />
        </div>
    );
}
