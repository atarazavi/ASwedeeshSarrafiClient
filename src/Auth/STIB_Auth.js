// app config
import AppConfig from 'Constants/AppConfig';
import {NotificationManager } from 'react-notifications';

class STIB_Auth {  
    login(uName, password, fromlink, cb, response) {
        (async () => {
            try{
                const rawResponse = await fetch(AppConfig.baseURL + '/authenticate', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username":"milad",
                        "password":"something"
                        // "username":uName,
                        // "password":password
                    })
                });
                const content = await rawResponse.json();            
                if (rawResponse.status === 200){
                    console.log('token: ', content.token);
                    localStorage.setItem("given_token", "Bearer "+content.token);
                    // localStorage.setItem("CurrentUsersID", content.UserID)
                    localStorage.setItem("CurrentUsersID", 0)
                    cb()
                }else{
                    NotificationManager.error('usename or password is incorrect' + rawResponse.status)
                    fromlink()
                }
            } catch (err){
                NotificationManager.error("something went wrong on Connecting The Server : " + err);
            }
        })();
    }

    logout(cb) {
        cb
    }
  
    isAuthenticated() {
    }
  }
  
  export default new STIB_Auth();