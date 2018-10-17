import React from "react";
import Axios from "axios";
import {
    FormGroup,
    ControlLabel,
    Button,
    Row,
    Form,
    FormControl,
    Col,
    Glyphicon,
    Well,
    InputGroup
} from 'react-bootstrap';
import ContactTypeAhead from "../Components/ContactTypeAhead";
import opencage from "opencage-api-client";


const container = {
    display: 'flex',
    justifyContent: 'center',

}

const contactAhead = {
    margin: '0 auto',
    width: "75vw",
    padding: " 15px"
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

    componentDidMount() {
        let lat;
        let long;
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            opencage.geocode({ q: `${lat}, ${long}`, language: 'fr', key: process.env.REACT_APP_OCD_API_KEY }).then(data => {
                if (data.status.code == 200) {
                    if (data.results.length > 0) {

                        return data.results[0].components;
                    }
                } else {
                    console.log('error', data.status.message);
                }
            }).then(data => {
                const { city, house_number, road, state } = data;
                this.setState({
                    location: `${house_number} ${road}, ${city} ${state}`
                })
                console.log(data)
            }).catch(error => {
                console.log('error', error.message);
            });
        })
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
        Object.keys(this.state).forEach((key, index) => {
            this.setState({ [key]: "" });
        });
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
        if (e.target) e.preventDefault();

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
            <Well>
                <Form onSubmit={this.uploadWidget} horizontal>
                    
                    <div style={container}>
                        <FormGroup controlId="message">
                            <FormControl
                                onChange={this.handleChange}
                                componentClass="textarea"
                                placeholder="Message"
                            />
                        </FormGroup>
                    </div>

                    <div style={container} >
                        <FormGroup controlId='location'>
                            <InputGroup>
                                <InputGroup.Addon >Location</InputGroup.Addon>
                                <FormControl
                                    onChange={this.handleChange}
                                    value={this.state.location}
                                    type="text"
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <div style={contactAhead}>
                        <ContactTypeAhead
                            handleRecipientList={this.handleRecipientList}
                            userId={this.props.userId}
                            contacts={this.props.list}
                        />
                    </div>

                    <Button
                        bsStyle="primary"
                        type="submit"
                    >
                        send
                    </Button>
                </Form>
            </Well>
        )
    }
}