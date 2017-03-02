'use strict';

// this is all available stagenames

/*
  in order for picklist's onChange() method to work correctly, the default value for state should NOT be an empty array

  * Didn't see the source code for the picklist plugin, but it seemed the plugin will hook up the onChange event with option item during the first time the component was being created.
  * Therefore, if the default state is an empty array, then the event won't be hooked at all; if the default state is an array with 1 element, then the event will only be hooked with the first item.
  * Unfortunately, it seemed we can't wait for the state being udpated and then try to create the component and hook up the event (don't know exactly why but I did tried)
  * So a way to cheat is to make the default state with more than enough dummy items
  * See Selector.jsx for more details
*/

let defaultStage = [];
for(let i=0; i<50; i++){
  defaultStage.push('');
}

const stagenames = (state = defaultStage, action) => {
    switch (action.type) {
        case 'SET_STAGE_NAMES':
          state = action.stagenameList;
          return state;
        default:
          return state;
    }
}

export default stagenames;
