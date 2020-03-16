import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Dashboard from "./container/Dashboard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialIcon from "material-icons-react";

import Header from "./components/Header";
import logo from "./assets/img/logo_full.png";
import Profile from "./container/Profile";
import Login from "./container/Auth/Login";
import Signup from "./container/Auth/Signup";
import ConfirmAccount from "./container/Auth/ConfirmAccount";
import ResendVerificationCode from "./container/Auth/ResendVerificationCode";
import ForgotPassword from "./container/Auth/ForgotPassword";
import SetNewPassword from "./container/Auth/SetNewPassword";
import { getCurrentUserSession } from "./api/User";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUserSession()
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        {user.isAuthenticated && (
          <Header
            left={<MaterialIcon icon="menu" />}
            middle={<img src={logo} alt="logo" />}
            right={<Profile />}
          />
        )}
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/confirm-account" component={ConfirmAccount} />
          <Route
            path="/resend-verification-code"
            component={ResendVerificationCode}
          />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/set-new-password" component={SetNewPassword} />
          <PrivateRoute exact path="/" component={Dashboard} auth={user} />
        </Switch>
      </Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCurrentUserSession
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
