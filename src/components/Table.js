import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpensesAction, setEditAction } from '../actions';

import '../components/table.css';

class Table extends React.Component {
  handleClickEdit = (id) => {
    const { setEdit, handleClickSetState, expenses } = this.props;

    setEdit(id);

    const expense = expenses.find((expense) => expense.id === id);

    handleClickSetState(expense);
  };

  render() {
    const { expenses, deleteExpense } = this.props;

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            ({
              currency,
              description,
              exchangeRates,
              id,
              method,
              tag,
              value,
            }) => (
              <tr key={id}>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>
                  {exchangeRates[currency].name.replace('/Real Brasileiro', '')}
                </td>
                <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(
                    Math.floor(value * exchangeRates[currency].ask * 100) / 100
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className='edit-button'
                    data-testid='edit-btn'
                    type='button'
                    onClick={() => this.handleClickEdit(id)}
                  >
                    Editar
                  </button>
                  <button
                    className='delete-button'
                    data-testid='delete-btn'
                    type='button'
                    onClick={() => deleteExpense(id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpensesAction(id)),
  setEdit: (id) => dispatch(setEditAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  handleClickSetState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
