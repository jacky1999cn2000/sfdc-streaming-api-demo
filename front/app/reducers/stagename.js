'use strict';

const stagename = (state = 'Closed Won', action) => {
    switch (action.type) {
        case 'UPDATE_STAGENAME':
          state = action.stagename;
          return state;
        default:
          return state;
    }
}

export default stagename;
