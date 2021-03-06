import React from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';

import * as loginActions from '../actions/loginActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      alreadyUser: true,
      forgotPassword: false,
    };
  }

  componentWillMount() {
    if (this.props.login.logged) {
      // Redirect to home page
    }
  }

  forgotPassword() {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    });
  }

  registerUser() {
    this.setState({
      alreadyUser: !this.state.alreadyUser,
    });
  }

  renderSignIn() {
    return (
      <SignIn
        history={this.props.history}
        loginPending={this.props.login.loginPending}
        errorMessage={this.props.login.errorMessage}
        togglePage={() => this.props.togglePage()}
        loginCredentials={(data, history) => this.props.loginCredentials(data, history)}
        forgotPassword={() => this.forgotPassword()}
      />
    );
  }

  renderSignUp() {
    return (
      <SignUp
        togglePage={() => this.props.togglePage()}
        registerCredentials={data => this.props.registerCredentials(data)}
      />
    );
  }

  renderForgotPassword() {
    return (
      <ForgotPassword
        forgotPassword={this.state.forgotPassword}
        toggle={() => this.forgotPassword()}
      />
    );
  }

  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          { this.state.forgotPassword ?
            this.renderForgotPassword()
            :
            this.props.login.registerPage ? this.renderSignUp() : this.renderSignIn() }
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginReducer,
});

const mapDispatchToProps = dispatch => ({
  togglePage: () => {
    dispatch(loginActions.togglePage());
  },
  registerCredentials: (data) => {
    dispatch(loginActions.sendRegisterCredentials(data));
  },
  loginCredentials: (data, history) => {
    dispatch(loginActions.sendLoginCredentials(data, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
