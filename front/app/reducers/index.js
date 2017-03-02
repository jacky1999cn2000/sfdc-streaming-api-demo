'use strict';

import { combineReducers } from 'redux';
import amount from './amount';
import stagename from './stagename';
import stagenames from './stagenames';

const reducers = combineReducers({
  amount,
  stagename,
  stagenames
});

export default reducers;
