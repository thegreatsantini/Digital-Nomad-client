import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../constants';
import { Col, Image } from 'react-bootstrap';

export default class SentPostCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser : false,
            
        };
    }

    // componentWillReceiveProps should be used maybe??    
    componentDidMount = async () => {
        console.log(this.props.userID)
        const fetchSentCards = await Axios.get(`${SERVER_URL}/postcards/api/v1/${this.props.userID}`)
        console.log(fetchSentCards.data)
    };
            
    render() {
        const user = this.props.currentUser || '';
            return (
            <div>
                <Col xs={6} md={4}>
                    <Image src="https://res.cloudinary.com/elusivebit/image/upload/v1534029227/espmccvfgbl5poi2rpuo.jpg" thumbnail />
                </Col>
            </div>
            )
    }
};