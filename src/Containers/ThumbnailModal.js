import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import ScrollArea from 'react-scrollbar';

export default class ThumbnailModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }

  handleShow = () =>{
    this.setState({ show: true });
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  render() {
    const recipients = this.props.recipients.map( (val,i) => {
      return (        
            <p>{val}</p>
      )
    })
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Info
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            <h5>Recipients</h5>
            <div> { recipients } </div>
          </ScrollArea>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Message</h4>
            <p>
              {this.props.message}
            </p>
            <h6>Sent from: {this.props.location}</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}
