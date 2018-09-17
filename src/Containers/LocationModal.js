import React, { Component } from 'react';
import { Button, Modal, Glyphicon, FormControl, FormGroup,Col, ControlLabel } from 'react-bootstrap';

const form__style = {
    marginBottom: '10px'
}

export default class LocationModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false
        };
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div>

                <Button onClick={this.handleShow}>
                    <Glyphicon glyph="pencil" />
                    Set location
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Set your location
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <FormGroup controlId="location">
                        <ControlLabel>Your Location</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Your Location" 
                            value={this.state.location}
                            onChange={this.props.handleChange}
                            />
                    </FormGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>Set Location</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
