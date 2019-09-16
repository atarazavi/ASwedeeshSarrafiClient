/**
 * Edit Address For
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';

const EditAddressForm = ({ selectedBankAccount, onUpdate }) => (
    <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={300}>
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    type="text"
                    name={selectedBankAccount.name}
                    id={selectedBankAccount.id}
                    value={selectedBankAccount.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="name">Info</Label>
                <Input
                    type="text"
                    name={selectedBankAccount.info}
                    id={selectedBankAccount.id}
                    value={selectedBankAccount.info}
                    onChange={(e) => onUpdate('info', e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="name">Description</Label>
                <Input
                    type="text"
                    name={selectedBankAccount.description}
                    id={selectedBankAccount.id}
                    value={selectedBankAccount.description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                />
            </FormGroup>
        </Form>
    </Scrollbars>
);

export default EditAddressForm;
