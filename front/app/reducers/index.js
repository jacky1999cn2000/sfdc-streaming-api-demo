'use strict';

import { combineReducers } from 'redux';
// an object containing stagenam and initial total amount whenever a new stagename was selected in dropdown list
import stageWithAmount from './stageAmount';
// available opp stages
import stagenames from './stagenames';

const reducers = combineReducers({
  stageWithAmount,
  stagenames
});

export default reducers;
