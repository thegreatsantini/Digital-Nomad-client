import React, { Component } from 'react';
import Axios from "axios";
import {
    FormGroup,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';


class NewAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            email: ''
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('loginToken');
        Axios.post(`${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/contacts/${this.props.id}/`, this.state, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(result => {
                localStorage.setItem('loginToken', result.data);
                this.props.updateUser();
                this.props.toggleAlert();
                Object.keys(this.state).forEach((key, index) => {
                    this.setState({ [key]: "" });
                });
            })
            .catch(err => {
                console.log('Error', err);
            });
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} horizontal>

                    <FormGroup controlId="name">
                        <Col sm={5}>
                            <FormControl
                                value={this.state.name}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Full Name"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <Col sm={5}>
                            <FormControl
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="email"
                                placeholder="johnnyappleseed@gmail.com"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="primary" type="submit">Add Address</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>)
    }

}

export default NewAddressForm;  