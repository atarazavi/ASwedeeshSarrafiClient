import React, { Component } from 'react';

import {
    CurrentBalance,
} from "Components/Widgets";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import DropzoneComponent from 'react-dropzone-component';

import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import FormGroupmaterial from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


export default class increaseBalance extends Component {
    constructor(props) {
       super(props);
 
       // For a full list of possible configurations,
       // please consult http://www.dropzonejs.com/#configuration
       this.djsConfig = {
          addRemoveLinks: true,
          acceptedFiles: "image/jpeg,image/png,image/gif"
       };
 
       this.componentConfig = {
          iconFiletypes: ['.jpg', '.png', '.gif'],
          showFiletypeIcon: true,
          postUrl: '/'
       };
 
       // If you want to attach multiple callbacks, simply
       // create an array filled with all your callbacks.
       // this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
 
       // // Simple callbacks work too, of course
       // this.callback = () => console.log('Hello!');
 
       // this.success = file => console.log('uploaded', file);
 
       // this.removedfile = file => console.log('removing...', file);
 
       this.dropzone = null;
    }
    
	handleChangeRadio = (e, key) => {
		this.setState({ [key]: e.target.value });
    }
    
	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
    }

	render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
  
        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
           init: dz => this.dropzone = dz,
           drop: this.callbackArray,
           addedfile: this.callback,
           success: this.success,
           removedfile: this.removedfile
        }
		return (
			<div className="user-widgets-wrapper">
				<PageTitleBar title={<IntlMessages id="Increase Balance" />} match={this.props.match} />
                <CurrentBalance currency="USD" />
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 d-sm-full">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <RctCollapsibleCard
                                    heading="By Receipt Info"
                                >
                                    <Form inline>
                                        <FormGroup className="mb-10 mr-sm-10 mb-sm-0">
                                            <Label for="moneyVolume" className="mr-sm-10">The amount of money</Label>
                                            <Input type="text" name="moneyVolume" id="moneyVolume" placeholder="How much?" />
                                        </FormGroup>
                                        <FormGroupmaterial className="mb-10 mr-sm-10 mb-sm-0">
                                            <RadioGroup row aria-label="money" name="money" onChange={(e) => this.handleChangeRadio(e, 'money')} >
                                                <FormControlLabel value="Euro" control={<Radio />} label="Euro" />
                                                <FormControlLabel value="USDollars" control={<Radio />} label="Dollars" />
                                                <FormControlLabel value="Koron" control={<Radio />} label="Koron" />
                                            </RadioGroup>
                                        </FormGroupmaterial>
                                        <FormGroup className="mb-10 mr-sm-10 mb-sm-0">
                                            <Label for="ReceiptNumber" className="mr-sm-10">Receipt Number</Label>
                                            <Input type="text" name="ReceiptNumber" id="ReceiptNumber" placeholder="Type the admission number" />
                                        </FormGroup>
                                    </Form>
                                    <Button variant="raised" color="primary" className="text-white" >Submit</Button>
                                </RctCollapsibleCard>
                            </div>
                        </div>
                    </div>
                    <RctCollapsibleCard
                        heading="By Uploading Receipt"
                        colClasses="col-sm-6 col-md-4 col-lg-4 w-8-half-block"
                        fullBlock
                    > 
                        <DropzoneComponent
                            config={config}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}
                        />
                        <Button variant="raised" color="primary" className="text-white m-10" >Submit</Button>
                    </RctCollapsibleCard>

                    <RctCollapsibleCard
                        heading="Balance Increasing"
                        colClasses="col-sm-6 col-md-4 col-lg-4 w-8-half-block"
                        fullBlock
                    >
                        <div className="p-50 w-100">
                            Online Payment Coming Sooooon!:
                            <hr />
                            <Button variant="raised" color="primary" className="text-white" >Coming Soon!</Button>
                        </div>
                    </RctCollapsibleCard>
                </div>
            </div>
		);
	}
}