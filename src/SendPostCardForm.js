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
import ContactTypeAhead from "./ContactTypeAhead";

export default class SendContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNames: []
        };
    }

handleRecipientList = (e) => {
    console.log('clicked', e)
};

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.props.updateUser)
        // Axios.post(`${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}/`, this.state)
        //     .then(result => {
        //         console.log('Success', result);
                
        //         localStorage.setItem('loginToken', result.data);
        //         this.props.updateUser();
        //     })
        //     .catch(err => {
        //         console.log('Error', err);
        //     });
    };

    componentDidMount = () => {
        console.log(this.props.userID)
    }

    handleChange = (e) => {
        const onlyNames = e.reduce((acc, next) => {
            acc.push(next['value'])
            return acc
        }, [])
        this.setState({ selectedNames: onlyNames }, ()=> console.log(this.state.selectedNames))
    }

    render() {
        return (
            <div>
                <ContactTypeAhead 
                    handleRecipientList={this.handleRecipientList} 
                    userID={this.props.userID}
                    handleRecipientList={this.handleChange}
                    />
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
                                value={ this.state.street } 
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Drury Lane"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="message">
                    <Col sm={5}>
                        <ControlLabel>Message</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Message" 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="city">
                        
                        <Col sm={5}>
                            <FormControl
                                value={ this.state.city }
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Prince Edwards Kingdom"
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
        )
    }
}