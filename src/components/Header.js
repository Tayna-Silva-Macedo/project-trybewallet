import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  calTotalExpenses = () => {
    const { expenses } = this.props;

    const total = expenses.reduce((acc, expense) => {
      const convertedValue = expense.value * expense.exchangeRates[expense.currency].ask;

      const sum = acc + convertedValue;

      return sum;
    }, 0);

    return (Math.floor(total * 100) / 100).toFixed(2);
  };

  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ this.calTotalExpenses() }</p>
          <p data-testid="header-currency-field">BRL</p>
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
