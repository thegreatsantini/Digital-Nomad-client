import React, { Component } from 'react';
import Axios from 'axios';
import PostCardsThumbnails from '../Components/PostCardsThumbnails';

export default class SentPostCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null
    };
  }

  handleRemove = async (e, val) => {
    e.preventDefault()

    const token = localStorage.getItem('loginToken');

    const cards = await Axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_DEV_SERVER}/postcards/api/v1/${this.props.userId}/remove/${val}`,
      headers: { 'Authorization': `Bearer ${token}` },
    });

    this.setState({
      cards: cards.data
    })
  }

  // componentWillReceiveProps should be used maybe??
  componentDidMount = async () => {

    let token = localStorage.getItem('loginToken');
    const fetchSentCards = await Axios.get(`${process.env.REACT_APP_DEV_SERVER}/postcards/api/v1/${this.props.userId}`,
      { 'headers': { 'Authorization': `Bearer ${token}` } })

    this.setState({ cards: fetchSentCards.data });
  };

  render() {
    if (!this.state.cards) {
      return (
        <div>
          <h3>"Loading"...</h3>
        </div>
      )
    }
    else {

      return (
        <div>
          {this.state.cards.length < 1
            ? "You don't have any post cards..."
            : <PostCardsThumbnails
              userId={this.props.userId}
              cards={this.state.cards}
              handleRemove={this.handleRemove}
              updateUser={this.props.updateUser}
            />}
        </div>
      )
    }
  }
};
