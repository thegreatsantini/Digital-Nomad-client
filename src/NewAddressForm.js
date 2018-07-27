import React from "react";
import Axios from "axios";
import { SERVER_URL } from './constants';
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';

class NewAddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newStreet: '',
            newCity: '',
            newState: '',
            newZip: ''
        };
    }

    componentDidMount = () => {
        // console.log(this.props.updateUser)
    };

    handleNameChange = (e) => {
        this.setState({
            newName: e.target.value
        })
    };

    handleNameChange = (e) => this.setState({ name: e.target.value });
    handleStreetChange = (e) => this.setState({ street: e.target.value });
    handleCityChange = (e) => this.setState({ city: e.target.value });
    handleStateChange = (e) => this.setState({ state: e.target.value });
    handleZipChange = (e) => this.setState({ zipcode: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.updateUser)
        Axios.post(`${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}/`, this.state)
            .then(result => {
                console.log('Success', result);
                
                localStorage.setItem('loginToken', result.data);
                this.props.updateUser();
            })
            .catch(err => {
                console.log('Error', err);
                // console.log('Error');
                // console.log(this.state)
            });
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                type="text"
                                placeholder="Name"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalStreet">
                        <Col componentClass={ControlLabel} sm={2}>
                            Street
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={ this.state.street } 
                                onChange={this.handleStreetChange}
                                type="text"
                                placeholder="Street"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalCity">
                        <Col componentClass={ControlLabel} sm={2}>
                            City
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={ this.state.city }
                                onChange={this.handleCityChange}
                                type="text"
                                placeholder="City"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalState">
                        <Col componentClass={ControlLabel} sm={2}>
                            State
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.state}
                                onChange={this.handleStateChange}
                                type="text"
                                placeholder="State"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalZipCode">
                        <Col componentClass={ControlLabel} sm={2}>
                            ZipCode
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.zipcode}
                                onChange={this.handleZipChange}
                                type="text"
                                placeholder="ZipCode"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Add Address</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>)
    }

}

export default NewAddressForm;  