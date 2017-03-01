# sfdc-streaming-api

* Development
  * `cd front`
  * `make install` (if not installed node_modules)
  * `make bash`
  * `npm start` (as normal React app, now if you go to http://localhost:8080, you can see the app running - the console will throw error since it didn't recognize the Javascript Remoting method; however, the important thing is that the `bundle.js` file http://localhost:8080/bundle.js was created/updated automatically whenever you make changes)
  * `ngrok http 8080` - this will map localhost:8080 to a https url
  * update VF page for the script url, then login SFDC for development (in this case, the VF page is `OppAmountTracker`, and the VF tab is also called `OppAmountTracker`)
  ```
  <apex:page showHeader="false" sidebar="false" standardStylesheets="false" applyBodyTag="false" applyHtmlTag="false" controller="OppTrackerController">
    <html>
      <body>
        <!-- reactjs -->
        <div id="app" />
        <script src="https://76aa1895.ngrok.io/bundle.js"/>
      </body>
    </html>
  </apex:page>

  ```

* Promisify Javascript Remoting
  * [Using JavaScript Promises with JavaScript Remoting and Visualforce Remote Object](https://www.youtube.com/watch?v=7XFk9VKxSe4)
  * [Kombucha Example](https://github.com/jacky1999cn2000/Kombucha/blob/master/src/pages/Kombucha.page)
  * These 2 examples used `Q` to promisify Javascript Remoting, and here we used `es6-promise` to do it. For bigger application, the `@RemoteAction` method could be a routing method, and route different tasks to different classes to handle (refer Kombucha https://github.com/jacky1999cn2000/Kombucha/blob/master/src/classes/KombuchaApexRouter.cls);
  ```
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

        // invoke the apex @RemoteAction method (remember to add 'controller="OppTrackerController"' in VF page)
        OppTrackerController.getInitialAmount(stagename,callback);
      });

      return q;
    }
  }
  ```
  * [es6-promises](http://www.datchley.name/es6-promises/)

* [Use 'jsforce' in lightning Component](http://salesforce.stackexchange.com/questions/159529/jsforce-in-lightning-component-controller)
