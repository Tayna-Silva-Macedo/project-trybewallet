import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { addUserEmailAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.formValidation();
      },
    );
  };

  formValidation = () => {
    const { email, password } = this.state;

    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const MIN_LENGTH_PASSWORD = 6;

    const isEmailOk = email.match(regex);
    const isPasswordOk = password.length >= MIN_LENGTH_PASSWORD;

    if (isEmailOk && isPasswordOk) {
      this.setState({ disabled: false });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUserEmailAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <Input
            data-testid="email-input"
            label="E-mail"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <Input
            data-testid="password-input"
            label="Senha"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button type="button" disabled={ disabled } onClick={ this.handleSubmit }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
