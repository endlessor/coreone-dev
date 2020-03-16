import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import loadingIcon from '../../assets/img/loading.svg'

class ConfirmAccount extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.location.state !== undefined ? props.location.state.username !== undefined ? props.location.state.username : '' : '',
      verficationcode: '',
      errorMsg: '',
      isLoading: false
    }

    this.confirmAccount = this.confirmAccount.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  confirmAccount(e){
    e.preventDefault()
    this.setState({ isLoading: true })
    const { username, verficationcode } = this.state;
    const usernameLowercase = username.toLowerCase();
    Auth.confirmSignUp(usernameLowercase, verficationcode)
    .then(data => {
      this.setState({
        errorMsg: '',
        isLoading: false
      })
      this.props.history.push('/login', { username: usernameLowercase })
    })
    .catch(err => {
      this.setState({
        errorMsg: err.message,
        isLoading: false
      })
    });
  }

  render() {
    const { user } = this.props
    const { username, verficationcode, errorMsg, isLoading } = this.state

    if (user.isAuthenticated) {
      return <Redirect to="/" />
    }

    return(
      <div>
        <div className="Container Container--sm sm-form">
          <h3>Check junk mail if you have not received email with the verification code yet</h3>
          <form onSubmit={this.confirmAccount} >
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

            <input
              type="text"
              name="verficationcode"
              value={verficationcode}
              placeholder="Verification code"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />

            {errorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            <button 
              id="confirmAccount_confirm_account_button"
              disabled={isLoading}
            >
              {isLoading ? <img alt="Loading..." className="loading-icon" src={loadingIcon} /> : 'Confirm account'}
            </button>
          </form>
          <div style={{ marginTop: 8 }}>
            <p><Link to="/resend-verification-code" id="confirmAccount_resend_verification_code"><small>Resend verification code</small></Link></p>
            <p>or <Link to="/login" id="confirmAccount_login">back to Log in</Link></p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ConfirmAccount);
