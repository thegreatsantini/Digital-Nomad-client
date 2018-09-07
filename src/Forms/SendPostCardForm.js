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
import ContactTypeAhead from "../Containers/ContactTypeAhead";
import { SERVER_URL } from "../constants";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


export default class SendContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipients: [],
            location: '',
            message: ''
        };
    }

    postToDb = async (data) => {
        console.log('sent')
        console.log(this.props.userID)
    let token = localStorage.getItem('loginToken');
        const postReq = await Axios.post(`${SERVER_URL}/postcards/api/v1/${this.props.userID}/add/`,{
            imgUrl: data,
            recipients: this.state.recipients,
            message: this.state.message,
            userId: this.props.userID
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        console.log('result', postReq.data)
        localStorage.setItem('loginToken', postReq.data);
        this.props.updateUser();
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




    componentDidMount = () => {
        // navigator.geolocation.watchPosition(this.success, this.error, options);
    }

    handleRecipientList = (e) => {
        const onlyNames = e.reduce((acc, next) => {
            acc.push(next['value'])
            return acc
        }, [])
        this.setState({ recipients: onlyNames })
    }

    handleChange = event => {
        console.log(event.target.id)
        this.setState({
        [event.target.id] : event.target.value,
        });
    };

    uploadWidget = async (e) => {
        e.preventDefault();
        await window.cloudinary.openUploadWidget({ cloud_name: `${process.env.REACT_APP_CLOUD_NAME}`, upload_preset: 'phaqrdzz', tags:['testing']},
            (error, result) => {
                if (error) { console.log('Couldn\'t post to Cloudinary', error) }
                else {
                    this.postToDb(result[0].secure_url)
                }
            });
        };

    render() {
        return (
            <div>
                <Form onSubmit={this.uploadWidget} horizontal>
                <ContactTypeAhead 
                    handleRecipientList={this.handleRecipientList} 
                    userID={this.props.userID}
                    />
                    <FormGroup controlId="message">
                        <Col sm={5}>
                            <ControlLabel>Message</ControlLabel>
                            <FormControl
                                onChange={this.handleChange}
                                componentClass="textarea" 
                                placeholder="Message" 
                                />
                            </Col>
                    </FormGroup>
                    {/* <FormGroup controlId="street">
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
                    </FormGroup> */}

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