import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../nav.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }


    click() {
        this.setState({ active: true });
    }

    handleLogout = (e) => {
        console.log('logging out...');
        e.preventDefault();
        localStorage.removeItem('loginToken');
        this.props.updateUser();
    }

    render() {
        return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#brand">Digital Nomad</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={this.handleLogout} href="#">
                        {this.props.user ? <a onClick={this.handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        {this.props.user ? <Link to="/profile">Profile</Link> : <Link to="/signup">Sign up</Link>}
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default Navigation;