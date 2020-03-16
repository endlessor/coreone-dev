import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import loadingIcon from '../../assets/img/loading.svg'

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMsg: '',
      isLoading: false
    }

    this.userSignup = this.userSignup.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  userSignup(e){
    e.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = this.state;
    const username = this.state.username.toLowerCase();
    const emailLowercase = email.toLowerCase();

    Auth.signUp({
        username,
        password,
        attributes: {
          name: emailLowercase,
        }
      })
      .then(data => {
        this.setState({
          errorMsg: '',
          isLoading: false
        })
        this.props.history.push('/confirm-account', { username: username })
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
    const { email, password, username, errorMsg, isLoading } = this.state

    if (user.isAuthenticated) {
      return <Redirect to="/" />
    }

    return(
      <div>
        <div className="Container Container--sm sm-form">
          <h3>Welcome to Coreone!</h3>
          <form onSubmit={this.userSignup} >
            <input
              type="email"
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
              name="email"
              value={email}
              placeholder="Username"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />

            {errorMsg ? <p className="error-msg">{errorMsg.includes("User already exists") ? "Username unavailable" : errorMsg}</p> : ''}
            <button disabled={isLoading} id="signup_signup_button">
              {isLoading ? <img alt="Loading..." className="loading-icon" src={loadingIcon} /> : 'Sign up'}
            </button>
          </form>

          <div style={{ padding: 16 }}>
            <p>Already have an account? <Link to="/login" id="signup_login">Log in</Link></p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Signup);
