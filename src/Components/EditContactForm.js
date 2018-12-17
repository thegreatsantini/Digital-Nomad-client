import React, { Component } from 'react';
import Axios from "axios";

import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';

export default class EditContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.state.name,
            street: '',
            email: this.props.location.state.email,
            city: '',
            zip: '',
            state: ''
        };
    }

    getUserData = async () => {
        let token = localStorage.getItem('loginToken');
        const getCurrentContact = await Axios.get(`${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/contact/${window.location.href.split('/')[5]}`,
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
        const { contactId } = this.props.location.state;
        
        let token = localStorage.getItem('loginToken');
        const updateContact = await Axios.put(` ${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/contacts/update/${contactId}`, this.state,
            {
                'headers': { 'Authorization': `Bearer ${token}` }
            });
        console.log(updateContact.data)
        this.props.updateUser()
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
                            <Button type="submit">Update Address</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
};
