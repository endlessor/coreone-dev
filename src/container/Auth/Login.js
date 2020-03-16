import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, Link } from "react-router-dom";
import { userLoginRequest } from "../../api/User";
import loadingIcon from "../../assets/img/loading.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      lostPassword: false
    };

    this.userLogin = this.userLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  userLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.userLoginRequest(username, password);
  }

  render() {
    const { user } = this.props;
    const { username, password } = this.state;

    if (user.isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.state
              ? this.props.location.state.from || "/"
              : "/"
          }
        />
      );
    }
    return (
      <div>
        <div className="Container Container--sm sm-form">
          <h3>Welcome back to Coreone!</h3>
          <form onSubmit={this.userLogin}>
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
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.onChange}
              autoCorrect="off"
              autoCapitalize="none"
              required
            />
            {user.FetchingUserError && (
              <p className="error-msg">
                {user.FetchingUserError.message.includes(
                  "Password reset required for the user"
                )
                  ? "Welcome back! because we launched a brand new website, you must reset your password. Please click Forgot password below to reset password."
                  : user.FetchingUserError.message.includes("User is disabled")
                  ? "User does not exist."
                  : user.FetchingUserError.message}
              </p>
            )}
            <button
              id="signin_signin_button"
              type="submit"
              disabled={user.isFetchingUser}
            >
              {user.isFetchingUser ? (
                <img
                  alt="Loading..."
                  className="loading-icon"
                  src={loadingIcon}
                />
              ) : (
                "Log in"
              )}
            </button>
          </form>
          <div style={{ marginTop: 8 }}>
            <p>
              <small>
                <Link to="/forgot-password" id="login_forgot_password">
                  Forgot password
                </Link>{" "}
                &nbsp; | &nbsp;{" "}
                <Link to="/confirm-account" id="login_confirm_account">
                  Confirm account
                </Link>
              </small>
            </p>
          </div>
          <div style={{ padding: 16 }}>
            <p>
              Haven't signed up yet?{" "}
              <Link to="/signup" id="signin_signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userLoginRequest
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
