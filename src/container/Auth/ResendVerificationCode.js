import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import loadingIcon from '../../assets/img/loading.svg'

class ResendVerificationCode extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      errorMsg: '',
      isLoading: false
    }

    this.resendVerificationClicked = this.resendVerificationClicked.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  resendVerificationClicked(e){
    e.preventDefault()
    this.setState({ isLoading: true })

    const { username } = this.state;
    const usernameLowercase = username.toLowerCase()

    Auth.resendSignUp(usernameLowercase)
    .then(data => {
      this.setState({
        errorMsg: '',
        isLoading: false
      })
      this.props.history.push('/confirm-account', { username: usernameLowercase })
    })
    .catch(err => {
      this.setState({
        errorMsg: err.message,
        isLoading: false
      })
    })
  }

  render() {
    const { user } = this.props
    const { username, errorMsg, isLoading } = this.state

    if (user.isAuthenticated) {
      return <Redirect to="/" />
    }

    return(
      <div>
        <div className="Container Container--sm sm-form">
          <h3>Enter your username to get a new verification code</h3>
          <form onSubmit={this.resendVerificationClicked} >
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Email"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />

            {errorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            <button
              id="resendVerificationCode_resend_verifycation_code_button"
              disabled={isLoading}
            >
              {isLoading ? <img alt="Loading..." className="loading-icon" src={loadingIcon} /> : 'Resend'}
            </button>
          </form>
          <div style={{ marginTop: 8 }}>
            <p><small><Link to="/confirm-account" id="resendVerificationCode_confirm_account">Confirm account</Link></small></p>
            <p>or <Link to="/login" id="resendVerificationCode_login">back to Log in</Link></p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ResendVerificationCode);
