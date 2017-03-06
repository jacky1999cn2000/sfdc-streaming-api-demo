'use strict';

import { fromJS, Map } from 'immutable';

const stageAmount = (state = Map(), action) => {
    switch (action.type) {
        case 'SET_STAGE_AMOUNT':
          state = state.set('stagename', action.stagename);
          state = state.set('amount', action.amount);
          return state;
        default:
          return state;
    }
}

export default stageAmount;
