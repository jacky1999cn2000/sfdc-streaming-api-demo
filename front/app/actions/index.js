'use strict';

export const addAmount = (amount) => {
    return {
        type: 'ADD_AMOUNT',
        amount
    };
}

export const initAmount = (amount) => {
    return {
        type: 'INIT_AMOUNT',
        amount
    };
}
