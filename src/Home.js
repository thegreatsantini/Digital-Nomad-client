import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AddressBook from './AddressBook'

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }

    componentDidMount = () => {
        console.log( 'Home comp:', this.props.user)
    };

    handleSelect(key) {

        this.setState({ key });
    }

    render() {
        return (
            <div>
                <Tabs
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="controlled-tab-example"
                >
                    <Tab eventKey={1} title="Address Book">
                        <AddressBook user={this.props.user} />
                    </Tab>
                    <Tab eventKey={2} title="Send post card">
                        send card here {this.props.user}
                    </Tab>
                    <Tab eventKey={3} title="Settings">
                        Settings
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Home;