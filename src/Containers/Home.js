import React, { Component } from 'react';
import { Tab, Tabs, Jumbotron } from 'react-bootstrap';
import AddressBook from '../Components/AddressBook'
import SendPostCardForm from '../Components/SendPostCardForm';
import NewAddressForm from '../Components/NewAddressForm';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }
    renderLandingPage = () => {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to Digital Nomad</h1>
                    <p>
                        Send digital postcards to your friends and family
                    </p>
                </Jumbotron>
            </div>
        )
    }

    renderUser = () => {
        return (
            <div>
                <Tabs
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="controlled-tab-example"
                >
                    <Tab eventKey={1} title="Address Book">
                        <AddressBook
                            list={this.props.savedContacts}
                            userId={this.props.id}
                            updateUser={this.props.updateUser}
                        />

                        <NewAddressForm
                            id={this.props.id}
                            updateUser={this.props.updateUser}
                        />

                    </Tab>
                    <Tab onClick={this.turnOnLocator} eventKey={2} title="Send post card">
                        <SendPostCardForm
                            list={this.props.savedContacts}
                            userId={this.props.id}
                            updateUser={this.props.updateUser}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }

    handleSelect(key) {
        this.setState({ key });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.id
                    ? this.renderUser()
                    : this.renderLandingPage()
                }
            </React.Fragment>
        );
    }
};