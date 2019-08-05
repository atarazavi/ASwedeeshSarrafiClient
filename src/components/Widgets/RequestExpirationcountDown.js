/**
 * New Order Countdown Widget
 */
import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// components
import CountDown from 'Components/CountDown/CountDown';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class RequestExpirationcountDown extends Component {
    render() {
        return (
            <Card className="rct-block">
                <CardBody className="d-flex">
                    <div>
                        <span className="d-flex justify-content-center align-items-center rounded-circle bg-warning p-15 mr-15">
                            <i className="zmdi zmdi-notifications-active zmdi-hc-lg text-white"></i>
                        </span>
                    </div>
                    <div>
                        <p className="fs-14 fw-bold mb-5">Remaining time for the Request to be Expired </p>
                        <span className="fs-12 mb-20 d-block text-muted">Click on the button to Complete/Cancle the request </span>
                        <h1 className="border py-5 px-15 d-inline-block mr-20"> <CountDown time={this.props.remainingtime} /> </h1>
                        <div className="d-inline-block">
                            <Button variant="raised" size="large" color="primary" className="text-white" component={Link} to="/app/ecommerce/checkout">
                                <IntlMessages id="components.checkout" />
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}
