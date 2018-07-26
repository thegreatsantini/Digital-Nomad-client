import React from "react";
import Axios from "axios";
import { SERVER_URL } from 'constants';
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
        console.log(this.props.updateUser)
    };    

    handleNameChange = (e) => {
        this.setState({
            newName: e.target.value
        })
    };

    handleNameChange = (e) => this.setState({ newName: e.target.value });
    handleStreetChange = (e) => this.setState({ newStreet: e.target.value });
    handleCityChange = (e) => this.setState({ newCity: e.target.value });
    handleStateChange = (e) => this.setState({ newState: e.target.value });
    handleZipChange = (e) => this.setState({ newZip: e.target.value });

   

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.updateUser())
        Axios.post(`${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}/` , this.state)
            .then(result => {
                console.log('Success', result);
                
                this.props.updateUser();
            })
            .catch(err => { console.log('Error', err.response.data); });
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
                            value={this.state.newName}
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
                            // value={ this.state.newStreet } 
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
                            // value={ this.state.newCity }
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
                            value={this.state.newState}
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
                            value={this.state.newZip}
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