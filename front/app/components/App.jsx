import React from 'react';
import {connect} from 'react-redux';

import Selector from './Selector';
import {getOppStages} from '../actions';

class App extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {};
  }

  componentWillMount(){
    // this.props.dispatch(getInitialAmount('Closed Won'));
    // load opp stagenames
    this.props.dispatch(getOppStages());
  }

  componentDidMount(){

  }

  render() {

    console.log('this.props.state: ',this.props.state);
    console.log('this.props.state.totalAmount: ',this.props.state.amount);

    let options = this.props.state.stagenames;

    return (
      <div className="slds-grid slds-grid--align-center">
        <div className="slds-grid--vertical">
          <p className="slds-text-heading--label slds-m-bottom--small">
            Salesforce Streaming API Demo
          </p>

          <Selector options={this.props.state.stagenames} dispatch={this.props.dispatch}/>

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
