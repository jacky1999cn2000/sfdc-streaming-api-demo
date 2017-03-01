'use strict';

const totalAmount = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_AMOUNT':
          return state + action.amount;
        case 'INIT_AMOUNT':
          state = action.amount;
          return state;
        default:
          return state;
    }
}

export default totalAmount;
