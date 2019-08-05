/**
 * Profile Page
 */
import React, { Component } from 'react';
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { NotificationManager } from 'react-notifications';

// intlmessages
import IntlMessages from 'Util/IntlMessages';

export default class Profile extends Component {

  /**
   * On Update Profile
   */
  onUpdateProfile() {
    NotificationManager.success('Profile Updated Successfully!');
  }

  render() {
    var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading"><IntlMessages id="widgets.personalDetails" /></h2>
        <Form>
          <FormGroup row>
            <Label for="firstName" sm={3}><IntlMessages id="components.firstName" /></Label>
            <Col sm={9}>
              <Input type="text" name="firstName" id="firstName" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={3}><IntlMessages id="components.lastName" /></Label>
            <Col sm={9}>
              <Input type="text" name="lastName" id="lastName" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="country" sm={3}><IntlMessages id="components.country" /></Label>
            <Col sm={9}>
              <Input type="select" name="country" id="country" className="input-lg" >
                {country_list.map(each => <option>{each}</option>)}  
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={3}><IntlMessages id="components.email" /></Label>
            <Col sm={9}>
              <Input type="text" name="email" id="email" className="input-lg mb-20" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="telephone" sm={3}><IntlMessages id="components.phoneNo" /></Label>
            <Col sm={9}>
              <Input type="tel" name="telephone" id="telephone" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passportNumber" sm={3}>PassportNumber</Label>
            <Col sm={9}>
              <Input type="tel" name="passportNumber" id="passportNumber" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="NationalID" sm={3}>National-ID</Label>
            <Col sm={9}>
              <Input type="tel" name="NationalID" id="NationalID" className="input-lg" />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        <h2 className="heading"><IntlMessages id="components.address" /></h2>
        <Form>
          <FormGroup row>
            <Label for="address" sm={3}><IntlMessages id="components.address" /></Label>
            <Col sm={9}>
              <Input type="text" name="address" id="address" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={3}><IntlMessages id="components.city" /></Label>
            <Col sm={9}>
              <Input type="text" name="city" id="city" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="state" sm={3}><IntlMessages id="components.state" /></Label>
            <Col sm={9}>
              <Input type="text" name="state" id="state" className="input-lg" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="zip" sm={3}><IntlMessages id="components.zipCode" /></Label>
            <Col sm={9}>
              <Input type="text" name="zip" id="zip" className="input-lg" />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        <Button variant="raised" color="primary" className="text-white" onClick={() => this.onUpdateProfile()}><IntlMessages id="widgets.updateProfile" /></Button>
      </div>
    );
  }
}
