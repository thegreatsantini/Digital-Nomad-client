import React from "react";
import Axios from "axios";
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';
import ContactTypeAhead from "./ContactTypeAhead";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


export default class SendContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNames: [],
            location: '',
        };
    }

success = async (pos) => {
    
    const crd = pos.coords;
    const userLocation = await Axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&sensor=true`);
    const formatedLocation = userLocation.data.results[2].formatted_address;
    this.setState({ location: formatedLocation })
};

error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


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
        navigator.geolocation.watchPosition(this.success, this.error, options);
    }

    handleRecipientList = (e) => {
        const onlyNames = e.reduce((acc, next) => {
            acc.push(next['value'])
            return acc
        }, [])
        this.setState({ selectedNames: onlyNames })
    }

    render() {
        return (
            <div>
                <ContactTypeAhead 
                    handleRecipientList={this.handleRecipientList} 
                    userID={this.props.userID}
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

                    <FormGroup controlId="location">
                    <Col sm={5}>
                        <ControlLabel>Your Location</ControlLabel>
                        <FormControl 
                            componentClass="input" 
                            placeholder="" 
                            value={this.state.location === '' ? 'Locating...' : this.state.location}
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