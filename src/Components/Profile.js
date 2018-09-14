import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import SentPostCards from '../Containers/SentPostCards';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,

        };
    }

    componentDidMount = () => {
        console.log(this.props.id)
    }


    renderProfilePage = () => {
        return (
            <React.Fragment>
                {/* <Image src={ testProfile } rounded alt='avatar' /> */}
                < ListGroup >
                    <ListGroupItem>Name: {this.props.name} </ListGroupItem>
                    <ListGroupItem>Email: {this.props.email} </ListGroupItem>
                    <ListGroupItem> 'other stuff' </ListGroupItem>
                </ListGroup >
                <Button
                    bsStyle="info"
                    onClick={() => this.setState({ editUser: true })}
                >
                    Update Info
                </Button>
                <SentPostCards 
                    userId={this.props.id} 
                />
            </React.Fragment>
        );
    }

    renderLoading = () => {
        return (
            <React.Fragment>
                <h3>Loading...</h3>
            </React.Fragment>
        )
    }


    render() {
        return (
            <React.Fragment>
                {this.props.id
                    ? this.renderProfilePage()
                    : this.renderLoading()
                }
            </React.Fragment>
        )
    }
}

{/* <EditProfileForm 
                    changeProfileInfo={this.changeProfileInfo} 
                    user={this.props.currentUser} 
                    handleChange={this.handleChange} 
                    /> */}