import React from "react";
import Axios from "axios";
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col,
    Glyphicon,
    Well
} from 'react-bootstrap';
import ContactTypeAhead from "../Containers/ContactTypeAhead";
import LocationModal from '../Containers/LocationModal';

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const button__group = {
    display: 'flex',
    justifyContent: 'space-evenly',
}


export default class SendContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipients: [],
            location: null,
            message: '',
        };
    }

    postToDb = async (data) => {

        let token = localStorage.getItem('loginToken');
        const getLocation = this.state.location || await this.findLocation();

        const postReq = await Axios.post(`${process.env.REACT_APP_DEV_SERVER}/postcards/api/v1/${this.props.userId}/add/`, {
            imgUrl: data,
            recipients: this.state.recipients,
            message: this.state.message,
            userId: this.props.userId,
            location: getLocation
        }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        localStorage.setItem('loginToken', postReq.data);
        this.props.updateUser();
    }

    success = async (pos) => {
        // const crd = pos.coords;
        const crd = navigator.geolocation.getCurrentPosition((info) => console.log(info));
        // const userLocation = await Axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&sensor=true`);
        console.log(crd)
        // const formatedLocation = userLocation.data.results[2].formatted_address;
        // this.setState({ location: formatedLocation }, ()=> console.log(this.state.location))
    };

    error = (err) => {
        console.warn(`ERROR(${err}): ${err}`);
    }

    findLocation = () => {
        navigator.geolocation.watchPosition(this.success, this.error, options);
    }

    handleRecipientList = (e) => {
        const onlyNames = e.reduce((acc, next) => {
            acc.push(next['value'])
            return acc
        }, [])
        this.setState({ recipients: onlyNames })
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    uploadWidget = async (e) => {
        e.preventDefault();
        await window.cloudinary.openUploadWidget({ cloud_name: `${process.env.REACT_APP_CLOUD_NAME}`, upload_preset: 'phaqrdzz', tags: ['testing'] },
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
                <Well>
                    <Form onSubmit={this.uploadWidget} horizontal>

                        <ContactTypeAhead
                            handleRecipientList={this.handleRecipientList}
                            userId={this.props.userId}
                            contacts={this.props.list}
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

                        <Button

                            onClick={this.findLocation}
                        >
                            Test location func
                            </Button>

                        {/* <FormGroup controlId="location">
                            <Col sm={5}>
                                <ControlLabel>Your Location</ControlLabel>
                                <FormControl
                                    componentClass="input"
                                    placeholder="Your Location"
                                    value={this.state.location}
                                />
                            </Col> 
                        </FormGroup> */}

                        <div style={button__group}>

                            <Button
                                type="submit"
                            // onClick={this.findLocation}
                            >
                                Send with current location
                            </Button>

                            <LocationModal
                                onChange={this.handleChange}
                            />
                        </div>
                    </Form>
                </Well>

            </div>
        )
    }
}