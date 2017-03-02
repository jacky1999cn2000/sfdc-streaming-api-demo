'use strict';

import Remoting from '../utils/remoting';

// when a new stagename was selected, and we got the new total amount via 'getInitialAmount', then reset the total amount value
export const setTotalAmount = (amount) => {
    return {
        type: 'SET_TOTAL_AMOUNT',
        amount
    };
}

// if the record received via streaming api matches the current stagename, then update the amount total by add the record's amount
export const addAmountToTotal = (amount) => {
    return {
        type: 'ADD_AMOUNT_TO_TOTAL',
        amount
    };
}

// to update the selected stagename
export const updateStageName = (stagename) => {
    return {
        type: 'UPDATE_STAGENAME',
        stagename
    };
}

// to retrieve and set all stagenames for the dropdown list
export const setStageNames = (stagenameList) => {
    return {
        type: 'SET_STAGE_NAMES',
        stagenameList
    };
}

/*
  whenever user select a new stagename via dropdown list, we need to get the inital amount total for all opps with that stagename
  of course, we need to update the selected stagename as well via 'dispatch(updateStageName(stagename));'
*/
export const getInitialAmount = (stagename) => {

    let params = {};
    params.stagename = stagename;

    return function(dispatch) {

      dispatch(updateStageName(stagename));

      return Remoting.invoke('getInitialAmount', params)
              .then((val) => {
                let response = JSON.parse(val);
                dispatch(setTotalAmount(response.result));
              })
              .catch((err) => {
                console.log('rejected: ', err)
              });
    }
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
