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
import ContactTypeAhead from "./Containers/ContactTypeAhead";
import { SERVER_URL } from "./constants";

export default class SandBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipients: [],
            message: '',
        };
    }

    postToDb = async (data) => {
        const postReq = await Axios.post(`${SERVER_URL}/postcards/api/v1/add/`,{
            imgUrl: data,
            recipients: this.state.recipients,
            message: this.state.message,
            userId: this.props.userID
        })
        console.log('result', postReq)
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
                    console.log(result[0].secure_url)
                    this.postToDb(result[0].secure_url)
                }
            });
        };

    componentDidMount = () => {
        console.log(this.props.userID)
        console.log(process.env.REACT_APP_NODE_ENV)
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

                    {/* <Button
                        type='submit'
                        onClick={this.uploadWidget} 
                        className="upload-button"
                        > 
                        upload image and Send post card
                    </Button> */}
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