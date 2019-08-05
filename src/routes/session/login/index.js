/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import {NotificationManager } from 'react-notifications';

// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

//STIB_Authentication
import STIB_Authentication from '../../../Auth/STIB_Auth'

class Signin extends Component {

  state = {
    email: '',
    password: '',
    isverifiedCaptcha: true,
    error: false,
    authError:"",
    from:""
  }

  /**
   * On User Login
   */
  onUserLogin() {
    if (this.state.isverifiedCaptcha === false) {
      NotificationManager.error(<IntlMessages id="Login.captcha"/>)
    }
    else if (this.state.email !== '' && this.state.password !== '' && this.state.isverifiedCaptcha) {
      STIB_Authentication.login(this.state.email, this.state.password, ()=>
      {
        this.props.history.push('/app/dashboard/ecommerce')
      }, 
      ()=>
      {
        this.props.history.push('/app/dashboard/ecommerce')
      }, 
      this.showerror
      )
    }
  }

  /**
   * On error
   */
  showerror = (arg) => {
    this.setState({
      authError:arg
    })
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push('/session/register');
  }
  
  callback = (response) => {
    this.setState({
      isverifiedCaptcha : true
    },function () {
      console.log("didcaptcha");
    })
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading &&
            <LinearProgress />
          }
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                    </Link>
                  </div>
                  <div>
                    <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                    <Button variant="raised" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-sm-7 col-md-7 col-lg-8">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2 className="font-weight-bold">STIB</h2>
                      <p className="mb-0">Life's complicated enough!</p>
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="raised"
                          size="large"
                          onClick={() => this.onUserLogin()}>
                          Sign In
                        </Button>
                      </FormGroup>
                    </Form>
                    <p><a className="text-muted" onClick={()=>{this.props.history.push('forgot-password')}}>Forgot Password?!</a></p>
                  </div>
                </div>
                <div className="col-sm-5 col-md-5 col-lg-4">
                  <SessionSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

export default Signin
