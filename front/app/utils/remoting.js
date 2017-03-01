'use strict';

require('es6-promise').polyfill();

module.exports = {

  invoke: function(stagename){

    // create a promise
    let q = new Promise(function(resolve, reject){

      // define callback
      let callback = function(result, event){
        if(event.status){
          resolve(result);
        }else{
          reject(event);
        }
      };

      // invoke the apex @RemoteAction method (remember to add 'controller="OppAmountTrackerController"' in VF page)
      OppAmountTrackerController.getInitialAmount(stagename,callback);
    });

    return q;
  }
}
