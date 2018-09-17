import React, { Component } from 'react';
import Axios from 'axios';
import PostCardsThumbnails from './PostCardsThumbnails';

export default class SentPostCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }



  // componentWillReceiveProps should be used maybe??
  componentDidMount = async () => {
    let token = localStorage.getItem('loginToken');
    const fetchSentCards = await Axios.get(`${process.env.REACT_APP_DEV_SERVER}/postcards/api/v1/${this.props.userId}`,
      { 'headers': { 'Authorization': `Bearer ${token}` } })
    this.setState({ cards: fetchSentCards.data });
  };

  render() {
    return (
      <div>
            {this.state.cards.length < 1 
              ? "Loading..." 
              : <PostCardsThumbnails 
                cards={this.state.cards} 
              />}
      </div>
          
    )
  }
};
