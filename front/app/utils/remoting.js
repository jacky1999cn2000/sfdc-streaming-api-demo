'use strict';

require('es6-promise').polyfill();

module.exports = {

  invoke: function(type, params){

    // create a promise
    let q = new Promise(function(resolve, reject){

      // define callback
      let callback = function(result, event){
        if(event.status){
          resolve(result.replace(/&quot;/g,'"'));
        }else{
          reject(event);
        }
      };

      // invoke the apex @RemoteAction method (remember to add 'controller="OppAmountTrackerController"' in VF page)
      OppAmountTrackerController.remoteRequestRouter(type, params, callback);
    });

    return q;
  }
}
