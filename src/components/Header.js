import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../components/header.css';
import carteira from '../images/carteira.png';
import perfil from '../images/perfil.png';

class Header extends React.Component {
  calTotalExpenses = () => {
    const { expenses } = this.props;

    const total = expenses.reduce((acc, expense) => {
      const convertedValue =
        expense.value * expense.exchangeRates[expense.currency].ask;

      const sum = acc + convertedValue;

      return sum;
    }, 0);

    return (Math.floor(total * 100) / 100).toFixed(2);
  };

  render() {
    const { email } = this.props;

    return (
      <div>
        <header className='header'>
          <div className='title-container'>
            <img
              className='wallet'
              src={carteira}
              alt='Desenho de uma carteira'
            />
            <h2 className='header-title'>
              TR<span>Y</span>BE WALLET
            </h2>
          </div>
          <div className='wallet-container'>
            <div className='wallet-email'>
              <img className='user-image' src={perfil} alt='Imagem de perfil' />
              <p className='user-email' data-testid='email-field'>
                {email}
              </p>
            </div>
            <div className='wallet-funds'>
              R$:
              <span className='user-funds' data-testid='total-field'>
                {this.calTotalExpenses()}
              </span>
              <span data-testid='header-currency-field'>BRL</span>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
