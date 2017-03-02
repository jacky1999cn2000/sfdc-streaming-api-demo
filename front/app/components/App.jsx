import React from 'react';
import {connect} from 'react-redux';

import {getInitialAmount, setTotalAmount} from '../actions';

class App extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {};
  }

  componentWillMount(){
    this.props.dispatch(getInitialAmount('Closed Won'));
  }

  componentDidMount(){
    $(document).ready(function() {
        $('[data-aljs="picklist"]').picklist({
            onChange: function(obj) {
              console.log('obj ',obj);
            }
        });
    });
  }

  render() {

    console.log('this.props.state: ',this.props.state);
    console.log('this.props.state.totalAmount: ',this.props.state.totalAmount);

    console.log('resourcePath ',resourcePath);

    let avatar1 = resourcePath+'/assets/images/avatar1.jpg';

    let icon_down = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#down';

    console.log('icon_down ',icon_down);

    return (
      <div className="slds-grid slds-grid--align-center">
        <div className="slds-grid--vertical">
          <p className="slds-text-heading--label slds-m-bottom--small">
            Salesforce Lightning Design System Trailhead Module
          </p>

          <div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click" data-aljs="picklist">
              <button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">
                  <span className="slds-truncate">Select an Option</span>
                  <svg aria-hidden="true" className="slds-icon">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={icon_down}></use>
                  </svg>
              </button>
              <div className="slds-dropdown slds-dropdown--left">
                  <ul className="slds-dropdown__list slds-dropdown--length-5" role="menu">
                      <li id="menu-0-0" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option A
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-1" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option B
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-2" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option C
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-3" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option D
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-4" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option E
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-5" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option F
                              </p>
                          </a>
                      </li>
                      <li id="menu-0-6" className="slds-dropdown__item" role="presentation">
                          <a href="javascript:void(0)" role="menuitemradio">
                              <p className="slds-truncate">
                                  <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="{!URLFOR($Resource.slds, '/assets/icons/utility-sprite/svg/symbols.svg#check')}"></use>
                                  </svg>Option G
                              </p>
                          </a>
                      </li>
                  </ul>
              </div>
          </div>

          <div>2</div>
        </div>
      </div>



      // <div>sfdc-streaming-api {this.props.state.amount}</div>
    );
  }
}


const mapStateToProps = (state) => {
    // console.log('state ', state);
    return {state: state}
}

const mapDispathToProps = (dispatch) => {
    return {dispatch: dispatch}
}

App = connect(mapStateToProps, mapDispathToProps)(App);

export default App;
