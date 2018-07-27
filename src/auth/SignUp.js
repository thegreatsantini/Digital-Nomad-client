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

class AmbassadorRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    // handleNameChange = (e) => { this.setState({ name: e.target.value }); }
    handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
    handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');

        axios.post(SERVER_URL + '/auth/signup', this.state)
            .then(result => {
                console.log('Successfully added user to db');
                // add newly-received token to localStorage
                localStorage.setItem('loginToken', result.data.token);
                // update user with a call to App.js
                this.props.updateUser();
            })
            .catch(err => { console.log('Error:', err) })
    }

    render() {

        if (this.props.user) { return (<Redirect to="/" />); }

        return (
            <div>
                <br />
                <h3>Sign up to get started</h3>
                <br />
                <Form onSubmit={this.handleSubmit} horizontal>
                    {/* <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={5}>
                            <FormControl 
                                type="Name" 
                                placeholder="Name"
                                value={this.state.name} 
                                onChange={this.handleNameChange}  
                                />
                        </Col>
                    </FormGroup> */}

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
        )
    }
}

export default AmbassadorRegistration;