import React, { Component } from 'react';
import { Col, Image, Row, Thumbnail, Button, Grid } from 'react-bootstrap';

export default class SentPostCards extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // componentWillReceiveProps should be used maybe??
    componentDidMount = async () => {
      console.log(this.props.cards)
    };

    render() {

          const formattedCards = this.props.cards.map((val, i )=> {
            return (
              <Col xs={6} md={4}>
                <Thumbnail src={val.imgUrl} alt="242x200">
                  <h3>{val.recipients}</h3>
                  <p>{val.message}</p>
                  <p>
                    <Button bsStyle="primary">Button</Button>&nbsp;
                    <Button bsStyle="default">Button</Button>
                  </p>
                </Thumbnail>
              </Col>
            )
    })
            return (
            <div>
            <Grid>
              <Row>
            {formattedCards}
              </Row>
              </Grid>
            </div>
            )
    }
};
