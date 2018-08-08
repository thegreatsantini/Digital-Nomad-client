import React, { Component } from 'react';
import Axios from "axios";
import { SERVER_URL } from './constants';
import Select from 'react-select';
// import { colourOptions } from '../data';

const names = [1,2,4,5,6,7,9];

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
export default class ContactTypeAhead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names : [],
            selectedNames: []
        };
    };

    getContactList = async () => {
        const contactsArray = await Axios.get( `${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}`)
        
        const namesOnly = contactsArray.data.reduce((myArray, item) => {
            myArray.push({value: item.name, label: item.name});
            return myArray
        }, [])
        this.setState({ names: namesOnly }, () => console.log('here',this.state.names))
    };

    componentDidMount = () => {
        this.getContactList()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // Axios.post(`${SERVER_URL}/addressbook/api/v1/contacts/${this.props.userID}/`, this.state)
        //     .then(result => {
        //         console.log('Success', result);

        //         localStorage.setItem('loginToken', result.data);
        //         this.props.updateUser();
        //     })
        //     .catch(err => {
        //         console.log('Error', err);
        //     });
    };

    // handleChange = (e) => {
    //     const onlyNames = e.reduce((acc, next) => {
    //         acc.push(next['value'])
    //         return acc
    //     }, [])
    //     this.setState({ selectedNames: onlyNames }, ()=> console.log(this.state.selectedNames))
    // }

    render() {
        return (
            <div>
                <Select
                    defaultValue={'select Recipients'}
                    isMulti
                    name="colors"
                    options={this.state.names}
                    className="basic-multi-select"
                    onChange={ this.props.handleRecipientList }
                    classNamePrefix="Select"
                    placeholder="Select Recipients"
                />
            </div>
            )
    }
}