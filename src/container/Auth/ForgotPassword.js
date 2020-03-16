import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import loadingIcon from '../../assets/img/loading.svg'

class ForgotPassword extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      errorMsg: '',
      isLoading: false
    }

    this.resetPassword = this.resetPassword.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  resetPassword(e){
    e.preventDefault()
    this.setState({ isLoading: true })
    const { username } = this.state;
    const usernameLowercase = username.toLowerCase()
    Auth.forgotPassword(usernameLowercase)
    .then(data => {
      this.setState({
        errorMsg: '',
        isLoading: false
      })
      this.props.history.push('/set-new-password', { username: usernameLowercase })
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
          <h3>Enter your username to set a new password</h3>
          <form onSubmit={this.resetPassword} >
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
              id="forgotPassword_forgot_password_button"
              disabled={user.isLoading}
            >
              {isLoading ? <img alt="Loading..." className="loading-icon" src={loadingIcon} /> : 'Submit'}
            </button>
          </form>
          <div style={{ padding: 16 }}>
            <p>or <Link to="/login" id="forgotPassword_login">back to Log in</Link></p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ForgotPassword);
