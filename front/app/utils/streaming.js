'use strict';

module.exports = {

  init: function(token){
    $.cometd.init({
       url: window.location.protocol+'//'+window.location.hostname+'/cometd/24.0/',
       requestHeaders: { Authorization: 'OAuth '+token }
    });
  },

  subscribe: function(){
    $.cometd.subscribe('/topic/OppUpdates', function(message) {
        console.log('channel ',JSON.stringify(message.channel));
        console.log('object ',JSON.stringify(message.data.sobject));
        console.log('event type ',JSON.stringify(message.data.event.type));
    });
  }

}
