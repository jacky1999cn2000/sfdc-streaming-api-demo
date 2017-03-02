'use strict';

// this is the selected stagename

const stagename = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_STAGENAME':
          state = action.stagename;
          return state;
        default:
          return state;
    }
}

export default stagename;
