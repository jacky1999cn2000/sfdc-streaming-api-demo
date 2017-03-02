'use strict';

import Remoting from '../utils/remoting';

export const setTotalAmount = (amount) => {
    return {
        type: 'SET_TOTAL_AMOUNT',
        amount
    };
}

export const addAmountToTotal = (amount) => {
    return {
        type: 'ADD_AMOUNT_TO_TOTAL',
        amount
    };
}

export const updateStageName = (stagename) => {
    return {
        type: 'UPDATE_STAGENAME',
        stagename
    };
}



export const getInitialAmount = (stagename) => {

    return function(dispatch) {

      dispatch(updateStageName(stagename));

      return Remoting.invoke(stagename)
              .then((val) => {
                dispatch(setTotalAmount(val));
              })
              .catch((err) => {
                console.log('rejected: ', err)
              });
    }
}
