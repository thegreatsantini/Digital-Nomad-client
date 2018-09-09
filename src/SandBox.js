import React from "react";
import {
    FormGroup,
    ControlLabel,
    Button,
    Form,
    FormControl,
    Col
} from 'react-bootstrap';
import ContactTypeAhead from "./Containers/ContactTypeAhead";


export default class SandBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipients: [],
            message: '',
        };
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

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Send Card</Button>
                        </Col>
                    </FormGroup>
                    </Form>
            </div>
        );
    }
}