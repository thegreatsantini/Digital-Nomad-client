import React, { Component } from 'react';
import Axios from "axios";
import { SERVER_URL } from '../constants';
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class EditContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            street: '',
            email: '',
            city: '',
            zip: '',
            state: ''
        };
    }

    getUserData = async () => {
        let token = localStorage.getItem('loginToken');
        const getCurrentContact = await Axios.get(`http://localhost:8080/addressbook/api/v1/contact/${window.location.href.split('/')[5]}`,
            {
                'headers': { 'Authorization': `Bearer ${token}` }
            });
        const contactInfo = getCurrentContact.data;
        this.setState({
            name: contactInfo.name,
            street: contactInfo.street,
            city: contactInfo.city,
            state: contactInfo.state,
            zipcode: contactInfo.zipcode,
            email: contactInfo.email,
            userId: contactInfo.userId
        })
    }

    componentDidMount = async () => {
        this.getUserData()
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('loginToken');
        const updateContact = await Axios.put(` ${SERVER_URL}/addressbook/api/v1/contacts/update/${this.state.userId}`, this.state,
            {
                'headers': { 'Authorization': `Bearer ${token}` }
            });
        console.log(updateContact.data)
        this.props.updateUser
        window.location = `${window.location.origin}/`;
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} horizontal>
                    <FormGroup controlId="name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Full Name
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.name}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Muffin Man"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="street">
                        <Col componentClass={ControlLabel} sm={2}>
                            Street
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.street}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Drury Lane"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="city">
                        <Col componentClass={ControlLabel} sm={2}>
                            City
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.city}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Prince Edwards Kingdom"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="state">
                        <Col componentClass={ControlLabel} sm={2}>
                            State
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.state}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="La La Land"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="zipcode">
                        <Col componentClass={ControlLabel} sm={2}>
                            ZipCode
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.zipcode}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="98028"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="email"
                                placeholder="muffins@yum.com"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Add Address</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
};
