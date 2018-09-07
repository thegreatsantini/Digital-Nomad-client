import React, { Component } from 'react';
import { Col, Image, Row, Thumbnail, Button, Grid } from 'react-bootstrap';
import Modal from './Modal';

export default class SentPostCards extends Component {
    render() {
          const formattedCards = this.props.cards.map((val, i )=> {
            return (
              <Col xs={6} md={4}>
                <Thumbnail src={val.imgUrl} alt="242x200">
                    <Modal message={val.message} conacts={val.conacts} />
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
