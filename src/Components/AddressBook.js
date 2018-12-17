import React from "react";
import { th, Table, thead, tr, Button, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const tableContainer = {
  margin: "0 auto",
  padding: "10px 12%",
  overflow: "scroll",
  height: "300px"
};

export default ({ list, userId, updateUser, toggleAlert }) => {
  const handleRemove = async (e, val) => {
    e.preventDefault();
    const token = localStorage.getItem("loginToken");

    await axios({
      method: "DELETE",
      url: `${
        process.env.REACT_APP_DEV_SERVER
      }/addressbook/api/v1/${userId}/remove/${val}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    toggleAlert('removed')
    updateUser();
  };

  const tableBody = list.map((val, i) => {
    const getName = (name, index) => name.split(" ")[index];
    return (
      <tr key={i}>
        {/* <td>{i + 1}</td> */}
        <td>{getName(val.name, 0)}</td>
        <td>{getName(val.name, 1)}</td>
        <td>{val.email} </td>
        <LinkContainer
          to={{
            pathname: `/contacts/edit/${val._id}`,
            state: {
              name: val.name,
              email: val.email,
              contactId: val._id
            }
          }}
        >
          <Button bsSize="small">
            <Glyphicon glyph="pencil" />
          </Button>
        </LinkContainer>
        <Button onClick={e => handleRemove(e, val._id)} bsSize="small">
          <Glyphicon glyph="trash" />
        </Button>
      </tr>
    );
  });

  return (
    <div style={tableContainer}>
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>First</th>
            <th>Last</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
};
