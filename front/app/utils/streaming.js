'use strict';

module.exports = {
  // store subscriptionId so we can call unsubscribe() with it
  _topicsubscription: null,

  // store a method passed in from App.jsx, so whenever a new record coming via streaming api, we can delete this method to handle it
  _notifier: null,

  init: function(token, notifier){
    $.cometd.init({
       url: window.location.protocol+'//'+window.location.hostname+'/cometd/24.0/',
       requestHeaders: { Authorization: 'OAuth '+token }
    });
    this._notifier = notifier;
  },

  subscribe: function(){
    this._topicsubscription = $.cometd.subscribe('/topic/OppUpdates', this._notifier);
  },

  unsubscribe: function(){
    $.cometd.unsubscribe(this._topicsubscription);
    this._topicsubscription = null;
  },

  // messageHanlder: function(message){
  //   console.log('channel ',JSON.stringify(message.channel));
  //   console.log('object ',JSON.stringify(message.data.sobject));
  //   console.log('event type ',JSON.stringify(message.data.event.type));
  // },

  disconnect: function(){
    if(this._topicsubscription){
      this.unsubscribe();
      this._notifier = null;
    }
    $cometd.disconnect();
  }

}
