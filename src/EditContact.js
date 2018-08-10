import React, { Component } from 'react';
import Axios from "axios";
import { SERVER_URL } from './constants';

export default class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {} 
        };
    }

    

    componentDidMount = async () => {
        const getCurrentContact = await Axios.get( `${SERVER_URL}/addressbook/api/v1/contact/${window.location.href.split('/')[5]}`);
        console.log(getCurrentContact.data)
        // this.setState({
        //     contact:getCurrentContact
        // })
    }

    render() {
        let contact = this.state.contact || 'Fetching contact to edit'
        return (
            <div>
                'contact'
            </div>
        );

    }

};