import React from 'react';
import Streaming from '../utils/streaming';

class Buttons extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {
        subDisabled: true,
        unsubDisabled: true
      };
  }

  // this makes sure the buttons were disabled if no stagename was selected 
  componentWillReceiveProps(nextProps){
    if(!this.props.stagename && !!nextProps.stagename){
      this.setState({
          subDisabled: false
      });
    }
  }

  toggle = () => {
      this.setState({
          subDisabled: !this.state.subDisabled,
          unsubDisabled: !this.state.unsubDisabled
      });
  }

  subClicked = () => {
    this.toggle();
    Streaming.subscribe();
    console.log('_id ',Streaming._topicsubscription);
  }

  unsubClicked = () => {
    this.toggle();
    Streaming.unsubscribe();
    console.log('_id ',Streaming._topicsubscription);
  }

  render() {

    return (
      <div className="button-group">
        <button className="slds-button slds-button--brand" disabled={this.state.subDisabled} onClick={() => this.subClicked()}>Subscribe</button>
        <button className="slds-button slds-button--brand" disabled={this.state.unsubDisabled} onClick={() => this.unsubClicked()}>Unsubscribe</button>
      </div>
    );
  }

}

export default Buttons;
