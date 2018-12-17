import React, { Component } from "react";
import { Tab, Tabs, Jumbotron } from "react-bootstrap";
import AddressBook from "../Components/AddressBook";
import SendPostCardForm from "../Components/SendPostCardForm";
import NewAddressForm from "../Components/NewAddressForm";
import AlertMessage from "../Components/AlertMessage";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1,
      added: false,
      removed: false,
      updated: false
    };
  }

  toggleAlert = type => {
    this.setState({
      [type]: true
    });
    setTimeout(() => this.setState({ [type]: false }), 2000);
  };

  renderLandingPage = () => {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome to Digital Nomad</h1>
          <p>Send digital postcards to your friends and family</p>
        </Jumbotron>
      </div>
    );
  };

  renderUser = () => {
    return (
      <div>
        <AlertMessage
          show={this.state.added}
          status={"success"}
          message={"successfully added a new contact"}
        />
        <AlertMessage
          show={this.state.removed}
          status={"warning"}
          message={"successfully removed a contact"}
        />
        <AlertMessage
          show={this.state.updated}
          status={"success"}
          message={"successfully updated a contact"}
        />
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Address Book">
            <div>
              <AddressBook
                list={this.props.savedContacts}
                toggleAlert={this.toggleAlert}
                userId={this.props.id}
                updateUser={this.props.updateUser}
              />

              <NewAddressForm
                id={this.props.id}
                updateUser={this.props.updateUser}
                toggleAlert={this.toggleAlert}
              />
            </div>
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
    );
  };

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    const { id } = this.props;
    return (
      <React.Fragment>
        {id && (
          <React.Fragment>
            {id ? this.renderUser() : this.renderLandingPage()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
