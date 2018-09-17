import React, { Component } from 'react';
import Axios from "axios";
import Select from 'react-select';



export default class ContactTypeAhead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            selectedNames: [],
        };
    };

    getContactList = async () => {
        let token = localStorage.getItem('loginToken');
        const contactsArray = await Axios.get(`${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/contacts/${this.props.userId}`,
            {
                'headers': { 'Authorization': `Bearer ${token}` }
            })
        const namesOnly = contactsArray.data.reduce((myArray, item) => {
            myArray.push({ value: item.name, label: item.name });
            return myArray
        }, [])
        this.setState({ names: namesOnly })
    };

    componentDidMount = () => {
        console.log(this.props)
        this.getContactList()
    };

    render() {
        return (
            <div>
                <Select
                    defaultValue={'select Recipients'}
                    isMulti
                    name="colors"
                    options={this.state.names}
                    className="basic-multi-select"
                    onChange={this.props.handleRecipientList}
                    classNamePrefix="Select"
                    placeholder="Select Recipients"
                />
            </div>
        )
    }
}