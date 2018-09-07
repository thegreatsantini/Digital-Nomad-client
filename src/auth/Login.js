import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';
import axios from 'axios';
import { SERVER_URL } from '../constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
    handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }


    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(SERVER_URL + '/auth/login', this.state)
            .then(result => {
                console.log('Success', result.data);
                // add newly-received token to localStorage
                localStorage.setItem('loginToken', result.data.token);
                // update user with a call to App.js
                this.props.updateUser;
                return (<Redirect to="/" />);
                // this.props.history.push("/")
            })
            .catch(err => { console.log('Error', err); });
    }

    render() {
        if (this.props.user) {
            return (<Redirect to="/" />);
        }

        return (
            <div>
                <br />
                <h2>Log into your account</h2><br />
                <Form onSubmit={this.handleSubmit} horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;