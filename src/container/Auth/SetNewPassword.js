import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import loadingIcon from '../../assets/img/loading.svg'

class SetNewPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.location.state !== undefined ? props.location.state.username : '',
      verficationcode: '',
      password: '',
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
    const { username, password, verficationcode } = this.state;
    const usernameLowercase = username.toLowerCase()
    Auth.forgotPasswordSubmit(usernameLowercase, verficationcode, password)
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
    const { username, verficationcode, password, errorMsg, isLoading } = this.state

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

            <input
              type="password"
              name="password"
              value={password}
              placeholder="New password"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />

            {errorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            <button
              id="setNewPassword_set_new_password_button"
              disabled={isLoading}
            >
              {isLoading ? <img alt="Loading..." className="loading-icon" src={loadingIcon} /> : 'Set a new password'}
            </button>
          </form>
          <div style={{ marginTop: 16 }}>
            <p>or <Link to="/login" id="setNewPassword_login">back to Log in</Link></p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(SetNewPassword);
