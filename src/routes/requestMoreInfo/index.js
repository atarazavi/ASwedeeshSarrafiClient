import React, { Component } from 'react';

import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from 'reactstrap';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import { NotificationManager } from 'react-notifications';
// app config
import AppConfig from 'Constants/AppConfig';

export default class RequestMoreInfo extends Component {
	state = {
        RequestID: this.props.location.state.RequestID,
        RequestTitle: 'vaarize nafagheye Amme!',
        RequestAccount: 'Amme - Pasargad',
        RequestAmount: 1000,
        RequestCurrency: 'Euro'
	}

	componentDidMount = () => {
    }
    handleChange = () => {
    }
    handleSubmit = () => {
    }
	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"More about / Edit : " + this.props.location.state.RequestTitle}>
							<Form>
								<FormGroup row>
									<Label for="RequestTitle" sm={4}>Request Title</Label>
									<Col sm={8}>
										<Input value={this.state.RequestTitle} type="text" name="RequestTitle" id="RequestTitle" onChange={this.handleChange} placeholder="Request Title" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestAccount" sm={4}>Request Destination Account</Label>
									<Col sm={8}>
										<Input value={this.state.RequestAccount} type="text" name="RequestAccount" id="RequestAccount" onChange={this.handleChange} placeholder="Request Account" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestAmount" sm={4}>Request Amount of Money</Label>
									<Col sm={8}>
										<Input value={this.state.RequestAmount} type="text" name="RequestAmount" id="RequestAmount" onChange={this.handleChange} placeholder="Request Amount" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestCurrency" sm={4}>Request Currency</Label>
									<Col sm={8}>
										<Input value={this.state.RequestCurrency} type="text" name="RequestCurrency" id="RequestCurrency" onChange={this.handleChange} placeholder="Request Currency" />
									</Col>
								</FormGroup>
                                <br></br>
								<FormGroup check className="p-0">
									<Button
										onClick={this.handleSubmit}
										variant="raised"
										color="primary"
										className="text-white mr-10 mb-10 btn-xs"
									>
										<IntlMessages id="Submit" />
									</Button>
									<Button
										onClick={() => this.props.history.push('requestsList')}
										variant="raised"
										color="secondary"
										className="text-white btn-xs mb-10"
									>
										<IntlMessages id="Return" />
									</Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>
		);
	}
}
