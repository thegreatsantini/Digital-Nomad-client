import React from 'react';
import {
    th,
    Table,
    thead,
    tr,
    Well
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const tableContainer = {
    margin: "0 auto",
    padding: "10px 20%",
    overflow: "scroll",
    height: "300px"
}


export default ({ list }) => {
    const tableBody = list.map((val, i) => {
        const getName = (name, index) => name.split(" ")[index];
        return (
            <tr>
                <td>{i + 1}</td>
                <td>{getName(val.name, 0)}</td>
                <td>{getName(val.name, 1)}</td>
                <td>{val.email} </td>
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
