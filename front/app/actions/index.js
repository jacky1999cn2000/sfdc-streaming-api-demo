'use strict';

import Remoting from '../utils/remoting';

/*
  whenever user select a new stagename via dropdown list, we need to get the inital amount total for all opps with that stagename
  of course, we need to update the selected stagename as well via 'dispatch(updateStageName(stagename));'
*/
export const getInitialAmount = (stagename) => {

    let params = {};
    params.stagename = stagename;

    return function(dispatch) {

      return Remoting.invoke('getInitialAmount', params)
              .then((val) => {
                let response = JSON.parse(val);
                dispatch(setStageAmount(stagename, response.result));
              })
              .catch((err) => {
                console.log('rejected: ', err)
              });
    }
}

// when a new stagename was selected, and we got the new stage and new total amount via 'getInitialAmount', then reset the stag and amount values
export const setStageAmount = (stagename, amount) => {
    return {
        type: 'SET_STAGE_AMOUNT',
        stagename,
        amount
    };
}

// get all available opp stagenames for the dropdown list
export const getOppStages = () => {

    let params = {};

    return function(dispatch) {

      return Remoting.invoke('getOppStages', params)
              .then((val) => {
                let response = JSON.parse(val);
                dispatch(setStageNames(response.result));
              })
              .catch((err) => {
                console.log('rejected: ', err)
              });
    }
}

// to retrieve and set all stagenames for the dropdown list
export const setStageNames = (stagenameList) => {
    return {
        type: 'SET_STAGE_NAMES',
        stagenameList
    };
}
