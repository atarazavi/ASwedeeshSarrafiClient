import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

import { Alert } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
// intl messages
import IntlMessages from "Util/IntlMessages";
import { NotificationManager } from "react-notifications";
import ReactSelect from "../advance-ui-components/autoComplete/component/ReactSelectAta"
import AppConfig from "Constants/AppConfig";

export default class RequestMoreInfo extends Component {
	state = {
		RequestID: this.props.location.state.RequestID,
		RequestTitle: "",
		RequestAccountID: 0,
		RequestAmount: 1000,
		RequestCurrency: "",
		RequestState: "",
		RequestDate: "",
		RequestFirstMessageID: 0,
		theMessages: [],
		SuggestionspaymentTarget: [],
		chosenPaymentTargetID: 0
	};

	componentDidMount = () => {
		if (this.props.location.state.messagesID) {
			(async () => {
				try {
					const rawResponse = await fetch(
						AppConfig.baseURL +
						"/request/byMessageId/" +
						this.props.location.state.messagesID,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: localStorage.getItem("given_token")
							}
						}
					);
					const content = await rawResponse.json();
					if (rawResponse.status === 200) {
						this.setState(
							{
								RequestID: content.id
							}, function () {
								this.getTheRequest()
							});
					} else {
						NotificationManager.error(
							"something went wrong" + rawResponse.status
						);
					}
				} catch (err) {
					NotificationManager.error(
						"something went wrong on Connecting The Server : " + err
					);
				}
			})();
		} else {
			this.getTheRequest()
		}

		(async () => {
			try {
				const rawResponse = await fetch(
					AppConfig.baseURL + "/paymentTarget/forCustomer/" + localStorage.getItem('CurrentUsersID'),
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("given_token")
						}
					}
				);
				const content = await rawResponse.json();
				if (rawResponse.status === 200) {
					let SuggestionspaymentTarget = content.map(each => {
						return({
							label: each.name,
							value: each.name,
							id: each.id
						})
					})
					this.setState({
						SuggestionspaymentTarget
					});
				} else {
					NotificationManager.error(
						"something went wrong" + rawResponse.status
					);
				}
			} catch (err) {
				NotificationManager.error(
					"something went wrong on Connecting The Server : " + err
				);
			}
		})();
	};
	getTheRequest = () => {
		(async () => {
			try {
				const rawResponse = await fetch(
					AppConfig.baseURL + "/request/" + this.state.RequestID,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("given_token")
						}
					}
				);
				const content = await rawResponse.json();
				if (rawResponse.status === 200) {
					this.setState({
						RequestState: content.state,
						RequestAmount: content.volume,
						RequestAccountID: content.paymentTargetId,
						RequestDate: content.date,
						RequestTitle: content.title,
						RequestFirstMessageID: content.firstMessageId
					}, function () {
						this.getMessages()
					});
				} else {
					NotificationManager.error(
						"something went wrong" + rawResponse.status
					);
				}
			} catch (err) {
				NotificationManager.error(
					"something went wrong on Connecting The Server : " + err
				);
			}
		})();
	}
	getMessages = () => {
		(async () => {
			try {
				const rawResponse = await fetch(
					AppConfig.baseURL +
					"/message/allChild/" +
					this.state.RequestFirstMessageID,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("given_token")
						}
					}
				);
				const content = await rawResponse.json();
				if (rawResponse.status === 200) {
					let theMessages = content.map(each => {
						let myDate = new Date(each.sendTime);
						return ({
							id: each.id,
							senderID: each.senderUserId,
							senderUserName: each.senderUserName,
							sendTime: myDate.toLocaleString(),
							isRead: each.isRead,
							body: each.body
						})
					})
					this.setState({
						theMessages
					});
				} else {
					NotificationManager.error(
						"something went wrong" + rawResponse.status
					);
				}
			} catch (err) {
				NotificationManager.error(
					"something went wrong on Connecting The Server : " + err
				);
			}
		})();
	}
	handleChangeOnautoComplete = (result) => {
        if (result === null) {
			this.setState({ chosenPaymentTargetID: 0 });
		  } else {
			this.state.SuggestionspaymentTarget.map(each => {
			  	each.value == result &&
				this.setState({ chosenPaymentTargetID: each.id });
			});
		  }
	}
	handleChange = () => { };
	handleSubmit = () => { };
	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-6 col-xl-6">
						<RctCollapsibleCard
							heading={"More about / Edit : " + this.state.RequestTitle}
						>
							<Form>
								<FormGroup row>
									<Label for="RequestTitle" sm={4}>
										Request Title
									</Label>
									<Col sm={8}>
										<Input
											value={this.state.RequestTitle}
											type="text"
											name="RequestTitle"
											id="RequestTitle"
											onChange={this.handleChange}
											placeholder="Request Title"
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestAccount" sm={4}>
										Request Destination Account
									</Label>
									<Col sm={8}>
										<ReactSelect
											changeHandler={this.handleChangeOnautoComplete}
											suggestions={this.state.SuggestionspaymentTarget}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestAmount" sm={4}>
										Request Amount of Money
									</Label>
									<Col sm={8}>
										<Input
											value={this.state.RequestAmount}
											type="text"
											name="RequestAmount"
											id="RequestAmount"
											onChange={this.handleChange}
											placeholder="Request Amount"
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="RequestCurrency" sm={4}>
										Request Currency
                  					</Label>
									<Col sm={8}>
										<Input
											value={this.state.RequestCurrency}
											type="text"
											name="RequestCurrency"
											id="RequestCurrency"
											onChange={this.handleChange}
											placeholder="Request Currency"
										/>
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
										onClick={() => this.props.history.push("requestsList")}
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
					<div className="col-sm-12 col-md-6 col-xl-6">
						<RctCollapsibleCard heading="Messages About this Request">
							{this.state.theMessages.map(each => {
								return (
									<Alert color={each.senderID == localStorage.getItem('CurrentUsersID') ? "primary" : "secondary"}>
										<h4 className="alert-heading">{each.senderUserName}</h4>
										{each.sendTime}
										<p>
											{each.body}
										</p>
									</Alert>
								)
							})}
						</RctCollapsibleCard>
					</div>
				</div>
			</div>
		);
	}
}
