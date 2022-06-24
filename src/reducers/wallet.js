import {
  ADD_EXPENSES,
  GET_CURRENCIES,
  DELETE_EXPENSES,
  SET_EDIT,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload,
      ),
    };
  case SET_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id !== action.payload.id
        ? expense
        : { ...expense, ...action.payload })),
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default walletReducer;
