'use strict';

const amount = (state = 0, action) => {
    switch (action.type) {
        case 'SET_TOTAL_AMOUNT':
          state = action.amount;
          return state;
        case 'ADD_AMOUNT_TO_TOTAL':
          state = state + action.amount;
          return state;
        default:
          return state;
    }
}

export default amount;
