import React, { Component } from 'react';
import { Tab, Tabs, Jumbotron } from 'react-bootstrap';
import AddressBook from './AddressBook'
import SendPostCardForm from '../Forms/SendPostCardForm';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }
    
    handleSelect(key) {
        this.setState({ key });
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Hello, {this.props.name}</h1>
                    <p>
                        Send digital postcards to your friends and family
                    </p>
                </Jumbotron>
                <Tabs
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="controlled-tab-example"
                >
                    <Tab eventKey={1} title="Address Book">
                        <AddressBook list={this.props.savedContacts} userID={this.props._id} updateUser={this.props.updateUser} />
                    </Tab>
                    <Tab eventKey={2} title="Send post card">
                        <SendPostCardForm list={this.props.savedContacts} userID={this.props._id} updateUser={this.props.updateUser}/>
                    </Tab>
                    <Tab eventKey={3} title="Settings">
                        Settings
                    </Tab>
                </Tabs>
            </div>
        );
    }
};