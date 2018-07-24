import React, { Component } from 'react';
import User from './User'

class AddressBook extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    };

//     name: String,
//   street: String,
//   city: String,
//   state: String,
//   zipcode: Number

    render() {
        return (
            <div>
                <User />
            </div>
        );
    }
}

export default AddressBook;