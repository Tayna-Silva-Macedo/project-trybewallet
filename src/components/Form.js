import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import { addExpensesThunk, editExpenseAction } from '../actions';

import '../components/form.css';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const category = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends React.Component {
  state = initialState;

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClickAdd = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch(addExpensesThunk(id, this.state));

    this.setState((prevState) => ({
      ...initialState,
      id: prevState.id + 1,
    }));
  };

  handleClickEdit = (expenseEdited) => {
    const { dispatch } = this.props;

    dispatch(editExpenseAction(expenseEdited));

    this.setState((prevState) => ({
      ...initialState,
      id: prevState.id,
    }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor, idToEdit } = this.props;

    const expenseEdited = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    return (
      <div className='form'>
        <Input
          data-testid="value-input"
          label="Valor: "
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <Input
          data-testid="description-input"
          label="Descrição: "
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <Select
          label="Moeda: "
          options={ currencies }
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        />
        <Select
          label="Método de pagamento: "
          options={ paymentMethods }
          name="method"
          value={ method }
          onChange={ this.handleChange }
        />
        <Select
          label="Categoria: "
          options={ category }
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        />
        {editor ? (
          <button type="button" onClick={ () => this.handleClickEdit(expenseEdited) }>
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ this.handleClickAdd }>
            Adicionar despesa
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

Form.defaultProps = {
  editor: false,
  idToEdit: 0,
};

export default connect(mapStateToProps)(Form);
