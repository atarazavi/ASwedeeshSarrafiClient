/**
 * Bank Accounts Page
 */
import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
	FormGroup,
	Form,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import { Collapse } from 'reactstrap';
import classnames from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationManager } from 'react-notifications';

import AppConfig from 'Constants/AppConfig';
// edit address from
import EditBankAccountForm from './EditBankAccountForm';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// user addresses
import userAddresses from '../data/userAddresses';

export default class BankAccounts extends Component {

	state = {
		default: false,
		collapse: false,
		loading: false,
		addresses: userAddresses,
		newBankAccount: {
			id: null,
			name: 'Admin',
			info: '',
			description: '',
		},
		bankAccountsList: [],
		deleteAddress: null,
		editBankAccountModal: false,
		selectedBankAccountID: 0,
		selectedBankAccount: null
	};
	componentDidMount = () => {
		this.getBankAccounts()
	}
	getBankAccounts = () => {
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
					let bankAccountsList = content.map(each => {
						return({
							id: each.id,
							name: each.name,
							info : each.info,
							description: each.description,
						})
					})
					this.setState({
						bankAccountsList
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
	handleChange = name => (event, checked) => {
		this.setState({ [name]: checked });
	};

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	}

	/**
	 * Add New Address Hanlder
	 */
	addNewBankAccount() {
		const { name, info, description } = this.state.newBankAccount
		
	}

	/**
	 * Hanlde Change Default Address
	 */
	handleChangeDefaultAddress() {
		this.setState({
			selectedAddress: {
				...this.state.selectedAddress,
				isDefault: !this.state.selectedAddress.isDefault
			}
		});
	}

	/**
	 * On Delete Address
	 */
	onDeleteBankAccount(address) {
		this.refs.deleteConfirmationDialog.open();
		this.setState({ deleteAddress: address });
	}

	/**
	 * Delete Address
	 */
	deleteAddress() {
		let addresses = this.state.addresses;
		let indexOfDeleteAddress = addresses.indexOf(this.state.deleteAddress);
		addresses.splice(indexOfDeleteAddress, 1);
		this.refs.deleteConfirmationDialog.close();
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ addresses, loading: false });
			NotificationManager.success('Address Deleted!');
		}, 2000);
	}

	/**
	 * Edit Address
	 */
	onEditBankAccount(BankAccount) {
		this.setState({
			selectedBankAccountID: BankAccount.id,
			selectedBankAccount: BankAccount,
			editBankAccountModal: true
		});
	}

	/**
	 * Toggle Edit Address Modal
	 */
	toggleEditBankAccountModal() {
		this.setState({ editBankAccountModal: false });
	}

	/**
	 * On Update Edit Address
	 */
	onUpdateEditBankAccountModal(key, value) {
		this.setState({
			selectedBankAccount: {
				...this.state.selectedBankAccount,
				[key]: value
			}
		});
	}

	/**
	 * On Update Address
	 */
	updateEditBankAccountModal() {	
		const { selectedBankAccountID, selectedBankAccount } = this.state;
		(async () => {
			try {
				const rawResponse = await fetch(
					AppConfig.baseURL +
					"/paymentTarget/" +
					selectedBankAccountID,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("given_token")
						},
						body: JSON.stringify({
							"id": selectedBankAccountID,
							"name": selectedBankAccount.name,
							"info": selectedBankAccount.info,
							"description": selectedBankAccount.description,
							"costumerId": localStorage.getItem('CurrentUsersID')
						})
					}
				);
				const content = await rawResponse.json();
				if (rawResponse.status === 200) {
					NotificationManager.success("Editing, Successfully Done!")
					this.getBankAccounts()
					this.toggleEditBankAccountModal()
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

	render() {
		const { bankAccountsList, addNewAddressDetail, loading, editBankAccountModal, selectedBankAccount } = this.state;
		return (
			<div className="address-wrapper">
				<h2 className="heading">Your frequent using bank accounts:</h2>
				<div className="row row-eq-height">
					{bankAccountsList.map((eachaccount, key) => (
						<div className="col-sm-6 col-md-4 col-lg-3" key={key}>
							<div className={classnames("card-base", { 'border-primary': true })}>
								<div className="d-flex justify-content-between">
									<h5 className="fw-bold">{eachaccount.name}</h5>
									<div className="list-action">
										<a href="javascript:void(0)" onClick={() => this.onEditBankAccount(eachaccount)}><i className="ti-pencil"></i></a>
										<a href="javascript:void(0)" onClick={() => this.onDeleteBankAccount(eachaccount)}><i className="ti-close"></i></a>
									</div>
								</div>
								<address>
									<span>{eachaccount.info}</span>
									<span>{eachaccount.description}</span>
								</address>
							</div>
						</div>
					))}
				</div>
				<Button variant="raised" color="primary" className="text-white" onClick={this.toggle}>Add New Bank Account</Button>
				<div className="py-50 w-50">
					{/* <Collapse isOpen={this.state.collapse}>
						<div className="mb-20">
							<h2 className="heading mb-5">Add a new Bank-Account</h2>
							<span>Make sure you write correct numbers and spells. </span>
						</div>
						<Form>
							<div className="row">
								<div className="col-md-6">
									<FormGroup>
										<Label className="col-form-label" for="city">City</Label>
										<Input
											type="text"
											name="city"
											id="city"
											className="input-lg"
											value={addNewAddressDetail.city}
											onChange={(e) => this.setState({
												addNewAddressDetail: {
													...addNewAddressDetail,
													city: e.target.value
												}
											})}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label" for="country">Country</Label>
										<Input
											type="text"
											name="country"
											id="country"
											className="input-lg"
											value={addNewAddressDetail.country}
											onChange={(e) => this.setState({
												addNewAddressDetail: {
													...addNewAddressDetail,
													country: e.target.value
												}
											})}
										/>
									</FormGroup>
								</div>
							</div>
							<FormGroup>
								<Label className="col-form-label" for="phone">Phone No.</Label>
								<Input
									type="tel"
									name="phone"
									id="phone"
									className="input-lg"
									value={addNewAddressDetail.phone}
									onChange={(e) => this.setState({
										addNewAddressDetail: {
											...addNewAddressDetail,
											phone: e.target.value
										}
									})}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="col-form-label" for="email">Email Address</Label>
								<Input
									type="email"
									name="email"
									id="email"
									className="input-lg"
									value={addNewAddressDetail.emailAddress}
									onChange={(e) => this.setState({
										addNewAddressDetail: {
											...addNewAddressDetail,
											emailAddress: e.target.value
										}
									})}
								/>
							</FormGroup>
							<Button variant="raised" color="primary" className="text-white" onClick={() => this.addNewBankAccount()}>Save</Button>
						</Form>
					</Collapse> */}
				</div>
				<DeleteConfirmationDialog
					title="Are You Sure Want To Delete?"
					message="This will delete your address permanently."
					onConfirm={() => this.deleteAddress()}
					ref="deleteConfirmationDialog"
				/>
				<Modal isOpen={editBankAccountModal} toggle={() => this.toggleEditBankAccountModal()}>
					<ModalHeader toggle={() => this.toggleEditBankAccountModal()}>Edit Bank Account</ModalHeader>
					<ModalBody>
						<EditBankAccountForm
							selectedBankAccount={selectedBankAccount}
							onUpdate={this.onUpdateEditBankAccountModal.bind(this)}
							handleChangeDefaultAddress={() => this.handleChangeDefaultAddress()}
						/>
					</ModalBody>
					<ModalFooter>
						<Button variant="raised" className="text-white btn-success" onClick={() => this.updateEditBankAccountModal()}>Update</Button>{' '}
						<Button variant="raised" className="text-white btn-danger" onClick={() => this.toggleEditBankAccountModal()}>Cancel</Button>
					</ModalFooter>
				</Modal>
				{loading &&
					<div className="d-flex justify-content-center loader-overlay">
						<CircularProgress />
					</div>
				}
			</div>
		);
	}
}
