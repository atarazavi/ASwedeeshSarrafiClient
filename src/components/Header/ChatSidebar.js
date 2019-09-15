import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NotificationManager } from 'react-notifications';

// helpers
import { textTruncate } from 'Helpers/helpers';

import AppConfig from 'Constants/AppConfig';
import { render } from 'react-dom';

class ChatSidebar extends Component {
   state = {
      messages: [
         {
         id: 0,
         first_name: 'Admin',
         last_chat: '',
         photo_url: require('Assets/avatars/user-3.jpg'),
      }
   ]
   }
   componentDidMount(){
      (async () => {
         try{
               const rawResponse = await fetch(AppConfig.baseURL + '/message/forUser/' + localStorage.getItem('CurrentUsersID'), {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('given_token')
               }
            });
            const content = await rawResponse.json();            
            if (rawResponse.status === 200){
                           
               let messages = content.filter(each => each.parrentMessage === -1).map(each => {
                     return({
                        id: each.id,
                        first_name: each.senderUserId === 0 ? 'Admin' : each.senderUserId,
                        last_chat: each.body,
                        photo_url: require('Assets/avatars/user-3.jpg'),
                     }) 
               })
               this.setState({
                  messages
               })
            }else{
               NotificationManager.error('something went wrong' + rawResponse.status)
            }
         } catch (err){
            NotificationManager.error("something went wrong on Connecting The Server : " + err);
         }
      })();
   }
   render(){      
      return(
         <div className="chat-sidebar rct-customizer">
            <AppBar position="static" color="primary">
               <Toolbar>
                  <Typography variant="title" color="inherit">
                     Chat
                  </Typography>
               </Toolbar>
            </AppBar>
            <List>
               {this.state.messages.map((eachMessage, key) => (
                  <ListItem key={key} button>
                     <Avatar src={eachMessage.photo_url} />
                     <ListItemText
                        primary={eachMessage.first_name}
                        secondary={textTruncate(eachMessage.last_chat, 16)}
                     />
                  </ListItem>
               ))}
            </List>
         </div>
      )
   }
}

export default ChatSidebar;
