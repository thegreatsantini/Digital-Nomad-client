import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../nav.css';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


class Navigation extends Component {
    

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
                        <Link to='/'>Digital Nomad</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.handleLogout} >
                            {this.props.user ? <a onClick={this.handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
                        </NavItem>
                        <NavItem eventKey={2}>
                            {this.props.user ? <Link to="/profile">Profile</Link> : <Link to="/signup">Sign up</Link>}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;