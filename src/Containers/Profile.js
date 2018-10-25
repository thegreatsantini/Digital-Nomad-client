import React, { Component } from 'react';
import SentPostCards from './SentPostCards';
import { Redirect } from 'react-router-dom'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,
        };
    }

    renderProfilePage = () => {
        return (
            <React.Fragment>
                <h2>Sent post cards</h2>
                <hr />
                <SentPostCards
                    userId={this.props.id}
                    updateUser={this.props.updateUser}
                />
            </React.Fragment>
        );
    }

    renderLoading = () => {
        return (
            <Redirect to='/' />
        )
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.id
                        ? this.renderProfilePage()
                        : this.renderLoading()
                }
            </React.Fragment>
        )
    }
}