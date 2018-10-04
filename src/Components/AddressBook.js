import React from 'react';
import {
    th,
    Table,
    thead,
    tr,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const tableContainer = {
    margin: "0 auto",
    padding: "10px 20%",
    overflow: "scroll",
    height: "300px"
}


export default ({ list, userId, updateUser }) => {

    const handleRemove = async (e, val) => {
        e.preventDefault()
        const token = localStorage.getItem('loginToken');

        const response = await axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/${userId}/remove/${val}`,
            headers: { 'Authorization': `Bearer ${token}` },
        });

        updateUser()
    }


    const tableBody = list.map((val, i) => {
        const getName = (name, index) => name.split(" ")[index];
        return (
            <tr>
                <td>{i + 1}</td>
                <td>{getName(val.name, 0)}</td>
                <td>{getName(val.name, 1)}</td>
                <td>{val.email} </td>
                <Button bsSize="small">
                    <Link
                        to={{
                            pathname: `/contacts/edit/${val._id}`,
                            state: {
                                name: val.name,
                                email: val.email,
                                contactId: val._id
                            }
                        }}
                    >
                        <Glyphicon glyph="pencil" />
                    </Link>
                </Button>
                <Button onClick={(e) => handleRemove(e, val._id)} bsSize="small">
                    <Glyphicon glyph="trash" />
                </Button>
            </tr>
        );
    });

    return (
        <div style={tableContainer}>
            {/* <Well> */}
            <Table responsive striped bordered condensed hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
            {/* </Well> */}
        </div>
    );
}
