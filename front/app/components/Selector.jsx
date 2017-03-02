import React from 'react';

import {getInitialAmount} from '../actions';

class Selector extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {};
  }

  componentDidMount(){
    $('[data-aljs="picklist"]').picklist({
        onChange: this.onChangeHandler
    });
  }

  onChangeHandler(obj) {
    console.log('watch');
    console.log('obj ',obj);
  }

  render() {

    let icon_down = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#down';
    let icon_check = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#check';

    return (
      <div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click" data-aljs="picklist">
          <button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">
              <span className="slds-truncate">Select a Stage</span>
              <svg aria-hidden="true" className="slds-icon">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={icon_down}></use>
              </svg>
          </button>
          <div className="slds-dropdown slds-dropdown--left">
              <ul className="slds-dropdown__list slds-dropdown--length-5" role="menu">
                  {
                    this.props.options.map((name, index) => {
                      let id = 'option-'+index;
                      return (
                        <li id={id} key={id} className="slds-dropdown__item" role="presentation">
                            <a href="javascript:void(0)" role="menuitemradio">
                                <p className="slds-truncate">
                                    <svg aria-hidden="true" className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--x-small">
                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={icon_check}></use>
                                    </svg>
                                    {name}
                                </p>
                            </a>
                        </li>
                      )
                    })
                  }
              </ul>
          </div>
      </div>
    )
  }

}

export default Selector;
