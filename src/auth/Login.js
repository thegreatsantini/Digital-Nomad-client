import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  FormGroup,
  ControlLabel,
  Button,
  Form,
  FormControl,
  Col
} from "react-bootstrap";
import axios from "axios";

const styles = {
  title: {
    fontSize: "48",
    fontWeight: "700"
  },
  formContainer: {
    background: "#fff",
    borderRadius: "2px",
    margin: "1rem",
    margin: "50px 15vw",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  forms: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",
    justifyContent: "center"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_DEV_SERVER + "/auth/login", this.state)
      .then(result => {
        // add newly-received token to localStorage
        localStorage.setItem("loginToken", result.data.token);
        // update user with a call to App.js
        this.props.updateUser();
        this.props.history.push("/")
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  render() {
    if (this.props.id) {
      return <Redirect to="/" />;
    }

    return (
      <div style={styles.formContainer}>
        <br />
        <h2 style={styles.title}>Log into your account</h2>
        <br />
        <Form style={styles.forms} onSubmit={this.handleSubmit} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col>
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
