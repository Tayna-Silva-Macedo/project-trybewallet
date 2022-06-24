export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const SET_EDIT = 'SET_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addUserEmailAction = (email) => ({
  type: ADD_USER_EMAIL,
  payload: email,
});

const getCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  const data = await response.json();

  const currencies = Object.keys(data).filter(
    (currency) => currency !== 'USDT',
  );

  dispatch(getCurrenciesSucess(currencies));
};

const addExpenses = (id, expense, rates) => ({
  type: ADD_EXPENSES,
  payload: {
    id,
    ...expense,
    exchangeRates: rates,
  },
});

export const addExpensesThunk = (id, expense) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  const data = await response.json();

  dispatch(addExpenses(id, expense, data));
};

export const deleteExpensesAction = (id) => ({
  type: DELETE_EXPENSES,
  payload: id,
});

export const setEditAction = (id) => ({
  type: SET_EDIT,
  payload: id,
});

export const editExpenseAction = (id, expense) => ({
  type: EDIT_EXPENSE,
  payload: {
    ...id,
    ...expense,
  },
});
