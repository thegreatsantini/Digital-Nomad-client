import React from 'react';
// import Axios from "axios";
import Select from 'react-select';


export default ({ contacts, handleRecipientList }) => {
    

    
        // let token = localStorage.getItem('loginToken');
        // const contactsArray = await Axios.get(`${process.env.REACT_APP_DEV_SERVER}/addressbook/api/v1/contacts/${this.props.userId}`,
        //     {
        //         'headers': { 'Authorization': `Bearer ${token}` }
        //     })
        // const namesOnly = contactsArray.data.reduce((myArray, item) => {
        //     myArray.push({ value: item.email, label: item.name });
        //     return myArray
        // }, [])
        // this.setState({ names: namesOnly })

        const data = contacts.reduce((myArray, item) => {
                myArray.push({ value: item.email, label: item.name });
                return myArray
            }, [])
    
        
        return (
            <div>
                
                <Select
                    defaultValue={'select Recipients'}
                    isMulti
                    name="colors"
                    options={data}
                    className="basic-multi-select"
                    onChange={handleRecipientList}
                    classNamePrefix="Select"
                    placeholder="Select Recipients"
                />
            </div>
        )
    }