# sfdc-streaming-api

* [Ariticle about Streaming API and Async Apex - Read it](https://developer.salesforce.com/blogs/developer-relations/2013/01/responsive-visualforce-using-streaming-api-and-asynchronous-apex.html)

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
  * **updated the code based on Kombucha example - check the code. however, the promisify gist is same**

* [Use 'jsforce' in lightning Component](http://salesforce.stackexchange.com/questions/159529/jsforce-in-lightning-component-controller)
* [How to avoid XSS and Reflected XSS](http://salesforce.stackexchange.com/questions/61376/how-do-i-fix-stored-xss-and-reflected-xss)

* Setup SLDS and ALJS framework
  * [Use SLDS in Visualforce](https://www.lightningdesignsystem.com/platforms/visualforce/)
    * Add `<apex:slds />` to your page and wrap your code in a container `<div class="slds-scope"> ... </div>`
    * The slds resource can now be accessed via `$Asset.SLDS` (compared to the alternative solution that if you upload zipped `slds` assets into static resource, then you can access it via `$Resource.slds`)
    ```
    // this example illustrate how to use slds in VF page (use svg to create an account avatar)

    <div class="slds-scope">

      <!-- This is an avatar defined in VF, so we can use the standard URLFOR function -->
      <span class="slds-icon_container slds-icon-standard-account" title="description of icon when needed">
        <svg aria-hidden="true" class="slds-icon">
          <!-- <use xlink:href="/apexpages/slds/2.1.3/assets/icons/standard-sprite/svg/symbols.svg#account"></use> -->
          <use xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#account')}"></use>
        </svg>
        <span class="slds-assistive-text">Account Icon</span>
      </span>

    </div>
    ```
    * Now if we copy the avatar's link, we can confirm `xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#account')}"` is equal to `"/apexpages/slds/2.1.3/assets/icons/standard-sprite/svg/symbols.svg#account"`
    * This is quite important since in React, we can't use `URLFOR` to concatenate URL (since `URLFOR` is a VF function), therefore, we need a way to figure out the path to our slds resource. Luckily, in VF, we can use the following script to get the slds path, and since `resourcePath` now is a global variable, we can then access it in React code.
    ```
    <script>
        var resourcePath = '{!JSENCODE($Asset.SLDS)}';
        // resourcePath is '/apexpages/slds/2.1.3'
    </script>
    ```
    * Before we talk about how to use `resourcePath`, let's take a look at how we can use [Appiphony Lightning JS framework](http://aljs.appiphony.com/#!/gettingStarted)
      * don't need `Import the SLDS Library as a Static Resource` step, since we now can add `<apex:slds />` to use the default slds
      * follow `Import the ALJS Library as a Static Resource` step to add ALJS Library to static resource
      * import jquery and ALJS (don't need to import CSS since we use the default)
      * now we can use the Plugins provided by ALJS (the plugin's initialization can be done in componentDidMount())
      ```
      componentDidMount(){
        $('[data-aljs="picklist"]').picklist({
            onChange: this.onChangeHandler
        });
      }
      ```
    * Now let's continue to talk why we need `resourcePath` in React.
      * First, when we use certain plug's html markup in React (e.g. Picklist), we need to convert some tags to be React compatible (e.g. `xmlns:xlink` to `xmlnsXlink`, and `xlink:href` to `xlinkHref`, just as `class` to `className`)
      * for svg to work, we need to know the path to the svg symbol (`URLFOR` won't work in React), and this is when we need the `resourcePath`
      ```
      // we want this url
      <svg aria-hidden="true" className="slds-icon">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/apexpages/slds/2.1.3/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
      </svg>

      // so we can do this in React (see App.jsx)

      let icon_down = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#down';

      ...

      <svg aria-hidden="true" className="slds-icon">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={icon_down}></use>
      </svg>
      ```
    * This is what the page looks like:
    ```
    <apex:page showHeader="false" standardStylesheets="false" sidebar="false" applyHtmlTag="false" applyBodyTag="false" docType="html-5.0" controller="OppAmountTrackerController">
        <html xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" lang="en">
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <title>OppAmountTracker</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <!-- Import the Design System style sheet -->
                <apex:slds />
            </head>
            <body>

              <div class="slds-scope">

                <!-- This is an avatar defined in VF, so we can use the standard URLFOR function -->
                <span class="slds-icon_container slds-icon-standard-account" title="description of icon when needed">
                  <svg aria-hidden="true" class="slds-icon">
                    <!-- <use xlink:href="/apexpages/slds/2.1.3/assets/icons/standard-sprite/svg/symbols.svg#account"></use> -->
                    <use xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#apps')}"></use>
                  </svg>
                  <span class="slds-assistive-text">Account Icon</span>
                </span>

                <!-- reactjs -->
                <div id="app" />
              </div>

              <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
              <script src="{!URLFOR($Resource.aljs, '/jquery.aljs-all-with-moment.min.js')}"></script>

              <script>
                  var resourcePath = '{!JSENCODE($Asset.SLDS)}';
              </script>

              <script src="https://64c82911.ngrok.io/bundle.js"/>
            </body>
        </html>
    </apex:page>
    ```
* Not use ALJS, but use pure CSS+React
  * Reason? *Picklist plugin with ALJS caused some issues (when use iteration to create Picklist component, need to make sure the option array was not empty so the event could be hooked up with each option item. See `/reducers/stagenames` and `\components\Selector` for more information)*
  * therefore, I decided to not use ALJS at all, but only pure CSS+React (I'll comment off the following 2 lines in VF page)
  ```
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="{!URLFOR($Resource.aljs, '/jquery.aljs-all-with-moment.min.js')}"></script>
  ```
  * I created another component called `Selector2` which didn't rely on jquery and ALJS

* Use jsforce in VF
  * add `<script src="https://cdnjs.cloudflare.com/ajax/libs/jsforce/1.7.0/jsforce.min.js"></script>`
  * initialize conn `var conn = new jsforce.Connection({ accessToken: '{!$API.Session_Id}' });`
  * create pushTopic
  ```
  PushTopic pushTopic = new PushTopic();
  pushTopic.Name = 'OppUpdates';
  pushTopic.Query = 'SELECT Id, Name, StageName, Amount FROM Opportunity';
  pushTopic.ApiVersion = 39.0;
  pushTopic.NotifyForOperationCreate = true;
  pushTopic.NotifyForOperationUpdate = true;
  pushTopic.NotifyForOperationUndelete = true;
  pushTopic.NotifyForOperationDelete = true;
  pushTopic.NotifyForFields = 'Referenced';
  insert pushTopic;
  ```
