import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    redirect: false,
    loading: false,
    username: '',
  };
  // mentoria Guthias 01-09 //

  clicado = () => {
    const { username } = this.state;
    this.setState({ redirect: true });
    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({ loading: false });
    });
  };

  handleUser = ({ target: { value } }) => {
    this.setState({ username: value });
  };
  // mentoria Guthias 01-09 //

  render() {
    const { loading, username, redirect } = this.state;
    if (!loading && redirect) return (<Redirect to="/search" />);
    const min = 3;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.clicado }
            disabled={ username.length < min }
          >
            <input
              type="text"
              id="username"
              data-testid="login-name-input"
              onChange={ this.handleUser }
            />
            Entrar
          </button>
          {loading && (
            <Loading />
          )}
        </form>
      </div>
    );
  }
}

export default Login;
