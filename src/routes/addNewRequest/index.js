import React, { Component } from 'react';

import {
	RecentTransferRates,
} from "Components/Widgets";

import { Collapse } from 'reactstrap';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';

import {
    CurrentBalance,
    Notes
} from "Components/Widgets";

import FormGroupmaterial from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


export default class addNewRequest extends Component {
    state = {
		default: false,
		collapse: false,
		loading: false,
		addresses: [
            {
                id: 1,
                name: 'Rukshana',
                apt: 'E-51',
                zipCode: '',
                state: 'Punjab',
                city: 'Mohali',
                country: 'India',
                addressLine1: '',
                addressLine2: 'Phase 8',
                phone: '',
                altPhone: '',
                emailAddress: '',
                isDefault: true
            },
            {
                id: 2,
                name: 'Sukhpal Singh',
                apt: '#12',
                zipCode: '',
                state: 'Chandigarh',
                city: 'Chandigarh',
                country: 'India',
                addressLine1: 'Near TY Hospital',
                addressLine2: '',
                phone: '',
                altPhone: '',
                emailAddress: '',
                isDefault: false
            }
        ],
		addNewAddressDetail: {
			id: null,
			name: 'Admin',
			city: '',
			country: '',
			phone: '',
			email: '',
		},
		deleteAddress: null,
		editAddressModal: false,
		selectedAddress: null
	};
    
	handleChangeRadio = (e, key) => {
		this.setState({ [key]: e.target.value });
    }
    
	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
    }
    
	addNewBankAccount(e) {
        e.preventDefault();
		const { city, country, state, addressLine2, addressLine1 } = this.state.addNewAddressDetail;
		if (city !== '' && country !== '' && state !== '' && addressLine1 !== '' && addressLine2 !== '') {
			let newAddress = {
				...this.state.addNewAddressDetail,
				id: new Date().getTime()
			}
			let addresses = this.state.addresses;
			if (newAddress.isDefault) {
				for (const address of addresses) {
					if (address.isDefault) {
						address.isDefault = false
					}
				}
			}
			addresses.push(newAddress);
			this.setState({ loading: true });
			let self = this;
			setTimeout(() => {
				self.setState({ loading: false, addresses });
			});
		}
	}
	render() {
		const { addNewAddressDetail } = this.state;
		return (
			<div className="user-widgets-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.user" />} match={this.props.match} />
                <CurrentBalance currency="USD" />
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 d-sm-full">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <RctCollapsibleCard
                                    heading="Request Information"
                                >
                                    <Form inline>
                                        <FormGroup className="mb-10 mr-sm-10 mb-sm-0">
                                            <Label for="moneyVolume" className="mr-sm-10">insert the amount of money</Label>
                                            <Input type="text" name="moneyVolume" id="moneyVolume" placeholder="How much?" />
                                        </FormGroup>
                                        <FormGroupmaterial className="mb-10 mr-sm-10 mb-sm-0">
                                            <RadioGroup row aria-label="money" name="money" value={this.state.money} onChange={(e) => this.handleChangeRadio(e, 'money')} >
                                                <FormControlLabel value="Euro" control={<Radio />} label="Euro" />
                                                <FormControlLabel value="USDollars" control={<Radio />} label="Dollars" />
                                                <FormControlLabel value="Koron" control={<Radio />} label="Koron" />
                                            </RadioGroup>
                                        </FormGroupmaterial>
                                    </Form>
                                    <hr></hr>
                                    <Form inline>
                                        Choose the destination Bank Account from your list:
                                        <br></br>
                                        <br></br>
                                        <Input type="select" name="country" id="country" className="input-lg" >
                                            <option>Ata Razavi - Pasargad Bank</option>
                                            <option>Milad Kamali - Mellat Bank</option>
                                            <option>Amme Ghezi - Ansar Bank</option>
                                        </Input>
                                    </Form>
                                    <hr></hr>
                                    It's not one of the above accounts?
                                    <br></br>
                                    <br></br>
                                    <Button variant="raised" color="primary" className="text-white" onClick={this.toggle}>Add New Bank Account</Button>
                                    <div className="py-50 w-100">
                                            <Collapse isOpen={this.state.collapse}>
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
                                            </Collapse>
                                        </div>
                                </RctCollapsibleCard>
                            </div>
                        </div>
                    </div>
                    <RctCollapsibleCard
                        colClasses="col-sm-6 col-md-4 col-lg-4 w-8-half-block"
                        fullBlock
                    >
                        <RecentTransferRates />
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Balance Increasing"
                        colClasses="col-sm-6 col-md-4 col-lg-4 w-8-half-block"
                        fullBlock
                    >
                        Click on the button to Increase your balance:
                        <hr />
                        <Button variant="raised" color="primary" className="text-white" >Increase My Balance</Button>
                    </RctCollapsibleCard>
                </div>
            </div>
		);
	}
}
