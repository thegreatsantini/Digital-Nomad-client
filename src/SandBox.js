import React from "react";
import { Form, FormGroup, FormControl, Row, Col, InputGroup } from 'react-bootstrap';
import opencage from "opencage-api-client";



export default class SandBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: " my locations"
        };
    }

    handleChange = event => {
        this.setState({
            location: event.target.value,
        });
    };

    //     city: "Kenmore"
    // country: "États-Unis d'Amérique"
    // country_code: "us"
    // county: "King County"
    // house_number: "6703"
    // postcode: "98028"
    // road: "Northeast 182nd Street"
    // state: "Washington"
    // state_code: "WA"

    componentDidMount = async () => {

        let lat;
        let long;
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            opencage.geocode({ q: `${lat}, ${long}`, language: 'fr', key: process.env.REACT_APP_OCD_API_KEY }).then(data => {
                if (data.status.code === 200) {
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
            // do_something(position.coords.latitude, position.coords.longitude);
        });



    }


    render() {
        // let location = this.state.locatio
        return (
            <div>
                <Row>
                    <Col xs={8} md={6} >
                        <Form>
                            <InputGroup>
                                <InputGroup.Addon >Edit Location</InputGroup.Addon>
                                <FormGroup controlId="formInlineName">
                                    <FormControl
                                        onChange={this.handleChange}
                                        value={this.state.location}
                                        type="text"
                                    />
                                </FormGroup>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}