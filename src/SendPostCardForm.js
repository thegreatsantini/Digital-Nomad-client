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
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

export default class SendPostCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names : [],
            selectedNames: []
        };
    }

    getContactList = async () => {
        const contactsArray = await Axios.get( `${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}`)
        // this.setState( {names: contactsArray.data}, ()=>{console.log(this.state.names)} )
        const namesOnly = contactsArray.data.reduce((myArray, item) => {
            myArray.push(item.name);
            return myArray
        }, [])
        this.setState({ names: namesOnly }, () => console.log(this.state.names))
    };
    componentDidMount = () => {
        this.getContactList()
    };

    

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
            });
    };

    render() {
        let {options} = this.state.names;
        return (
            <div>
                <Typeahead
                    multiple
                    labelKey={'Search Address Book'}
                    onChange={(selected) => { this.handleNameSelection(selected) }}
                    options={this.state.names}
                    placeholder={'Search Address Book'}
                    />
                <Form onSubmit={this.handleSubmit} horizontal>
                    <FormGroup controlId="name">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                value={this.state.name}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Name"
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
                                placeholder="State"
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