// import * as actionTypes from './types';

// export const increment = (ammount = 1) => (
//   { type: actionTypes.INCREMENT, ammount }
// );

// export const decrement = (ammount = 1) => (
//   { type: actionTypes.DECREMENT, ammount }
// );

import * as actionTypes from './types';

export const getUsers = () => ({
  type: actionTypes.GET_USERS,
  payload: null
})