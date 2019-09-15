/**
 * Messages Page
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import { NotificationManager } from 'react-notifications';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  FormGroup,
  Label
} from 'reactstrap';
import AppConfig from 'Constants/AppConfig';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

export default class Messages extends Component {

  state = {
    reloading: false,
    messages: [{
      id: 0,
      userName: 'Admin',
      messages: '',
      userAvatar: require('Assets/avatars/user-3.jpg'),
   }],
    newMessageModal: false,
    addNewMessageDetail: {
      title: '',
      message: '',
    },
    selectedMessage: {
      id: 0,
      userName: 'Admin',
      messages: '',
      userAvatar: require('Assets/avatars/user-3.jpg'),
    },
    viewMessageDialog: false
  }
  componentDidMount() {
    this.getUserMessages();
  }
  getUserMessages() {
    (async () => {
      try{
            this.setState({ reloading: true });
            const rawResponse = await fetch(AppConfig.baseURL + '/message/forUser/' + localStorage.getItem('CurrentUsersID'), {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': localStorage.getItem('given_token')
            }
         });
         const content = await rawResponse.json();            
         if (rawResponse.status === 200){
                        
            this.setState({ reloading: false });
            let messages = content.map(each => {
                  return({
                     id: each.id,
                     userName: each.senderUserId === 0 ? 'Admin' : each.senderUserId,
                     message: each.body,
                     userAvatar: require('Assets/avatars/user-3.jpg'),
                  }) 
            })
            this.setState({
               messages
            })
         }else{
            this.setState({ reloading: false });
            NotificationManager.error('usename or password is incorrect' + rawResponse.status)
         }
      } catch (err){
        this.setState({ reloading: false });
        NotificationManager.error("something went wrong on Connecting The Server : " + err);
      }
   })();
  }
  onReloadMessages() {
    this.setState({ reloading: true });
    this.getUserMessages()
  }
  openWriteNewMessageModal() {
    this.setState({ newMessageModal: true });
  }
  toggleWriteNewMessageModal() {
    this.setState({
      newMessageModal: !this.state.newMessageModal
    });
  }
  addNewMessage() {
    let toBsent = {
      "senderUserId": parseInt(localStorage.getItem('CurrentUsersID')),
      "reciverUserId": 2,
      "sendTime": 1565020749899,
      "viewTime": 0,
      "parrentMessage": 12,
      "title": this.state.addNewMessageDetail.title,
      "tag": "#something",
      "body": this.state.addNewMessageDetail.message,
      "isRead": false,
      "valid": false
    }
    console.log('toBsent', toBsent);
    
    (async () => {
      try{
            this.setState({ reloading: true });
            const rawResponse = await fetch(AppConfig.baseURL + '/message/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': localStorage.getItem('given_token')
            },
            body: JSON.stringify(toBsent)
         });           
         if (rawResponse.status === 200){
           this.getUserMessages()
           this.toggleWriteNewMessageModal()
         }else{
            this.setState({ reloading: false });
            NotificationManager.error('something went wrong' + rawResponse.status)
            this.toggleWriteNewMessageModal();
         }
      } catch (err){
        this.setState({ reloading: false });
        NotificationManager.error("something went wrong on Connecting The Server : " + err);
        this.toggleWriteNewMessageModal();
      }
    })();
  }
  handleCloseViewMessage() {
    this.setState({ viewMessageDialog: false });
  }
  viewMessage(message) {
    this.setState({ viewMessageDialog: true, selectedMessage: message });
  }

  render() {
    const { reloading } = this.state;
    console.log('messages', this.state.messages);
    
    return (
      <div className="messages-wrapper">
        <div className="row mb-30">
          <div className="col-sm-5 col-md-4 col-lg-3">
            <Button onClick={() => this.openWriteNewMessageModal()} variant="raised" color="primary" className="text-white btn-lg btn-block mb-10"><IntlMessages id="button.writeNewMessage" /></Button>
          </div>
        </div>
        <ul className="msg-list list-unstyled">
          <li className="d-flex justify-content-between align-items-center">
            <div className="toolbar">
              <IconButton onClick={() => this.onReloadMessages()} className="btn-outline-default">
                <i className="ti-reload"></i>
              </IconButton>
            </div>
            <span className="fs-14">1-50 of 234</span>
          </li>
          {this.state.messages.map(each => (
            <li className="clearfix d-flex" key={each.id}>
              <div className="media pull-left">
                {each.userAvatar !== '' ?
                  <img src={each.userAvatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                  : <Avatar className="mr-15">{each.userName.charAt(0)}</Avatar>
                }
                <div className="media-body">
                  <h5>{each.userName}</h5>
                  <p className="text-muted">{each.message}</p>
                  <div className="mb-10">
                    <Button className="btn-default btn-xs" onClick={() => this.viewMessage(each)}>
                      <i className="ti-eye mr-10"></i> Read
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {reloading &&
          <RctSectionLoader />
        }
        <Modal isOpen={this.state.newMessageModal} toggle={() => this.toggleWriteNewMessageModal()} className={this.props.className}>
          <ModalHeader toggle={() => this.toggleWriteNewMessageModal()}>Write New Message</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Title</Label>
              <Input
                type="text"
                name="massegeTitle"
                id="name"
                placeholder="Enter Name"
                value={this.state.addNewMessageDetail.title}
                onChange={(e) => this.setState({
                  addNewMessageDetail: {
                    ...this.state.addNewMessageDetail,
                    title: e.target.value
                  }
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="text"
                id="message"
                value={this.state.addNewMessageDetail.message}
                onChange={(e) => this.setState({
                  addNewMessageDetail: {
                    ...this.state.addNewMessageDetail,
                    message: e.target.value
                  }
                })}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="raised" color="primary" className="text-white" onClick={() => this.addNewMessage()}>Save</Button>{' '}
            <Button variant="raised" className="btn-danger text-white" onClick={() => this.toggleWriteNewMessageModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Dialog open={this.state.viewMessageDialog} onClose={() => this.handleCloseViewMessage()}>
          <DialogContent>
            {this.state.selectedMessage !== null &&
              <div className="clearfix d-flex">
              <div className="media pull-left">
                {this.state.selectedMessage.userAvatar !== '' ?
                  <img src={this.state.selectedMessage.userAvatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                  : <Avatar className="mr-15">{this.state.selectedMessage.userName.charAt(0)}</Avatar>
                }
                <div className="media-body">
                  <h5>{this.state.selectedMessage.userName}</h5>
                  <p className="text-muted">{this.state.selectedMessage.message}</p>
                </div>
              </div>
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
