'use strict';

import { combineReducers } from 'redux';
import amount from './amount';
import stagename from './stagename';

const reducers = combineReducers({
  amount,
  stagename
});

export default reducers;
