import React from 'react';
import classNames from 'classnames';

import {getInitialAmount} from '../actions';

class Selector2 extends React.Component {

  constructor() {
      super(...arguments);
      // stage was only used to control this componenet's behavior
      this.state = {
        open: false,
        selected: 'Select a Stage'
      };
  }

  // toggle dropdown list open or close
  toggle = () => {
      this.setState({
          open: !this.state.open
      });
  }

  // when an item being clicked, update "selected" stage (so the UI could be correctly displayed), and dispatch action to retrieve amount for newly selected stage (these would be stored in redux)
  clickItem = (stagename) => {
    this.setState({
        selected: stagename
    });

    this.props.dispatch(getInitialAmount(stagename));
  }

  render() {

    let icon_down = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#down';
    let icon_check = resourcePath+'/assets/icons/utility-sprite/svg/symbols.svg#check';

    return (
      <div className={classNames('slds-picklist','slds-dropdown-trigger','slds-dropdown-trigger--click',{'slds-is-open':this.state.open})} onClick={() => this.toggle()}>

        <button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">
            <span className="slds-truncate">{this.state.selected}</span>
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
                      <li id={id} key={id} onClick={() => this.clickItem(name)} className={classNames('slds-dropdown__item',{'slds-is-selected':this.state.selected == name})} role="presentation">
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
    );
  }

}

export default Selector2;
