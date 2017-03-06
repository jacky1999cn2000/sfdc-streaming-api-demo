import React from 'react';
import {connect} from 'react-redux';

import Selector from './Selector';
import Selector2 from './Selector2';
import Buttons from './Buttons';
import ChartRefresher from './ChartRefresher';

import Streaming from '../utils/streaming';

import {getOppStages} from '../actions';

import '../scss/main.scss';

class App extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {
        newRecord: null
      };
  }

  // load opp stagenames
  componentWillMount(){
    this.props.dispatch(getOppStages());
  }

  componentDidMount(){
    // init Streaming service
    Streaming.init(token, this.newRecordNotifier);
  }

  // disconnect Streaming service when unmount
  componentWillUnmount(){
    Streaming.disconnect();
  }

  /* defined like this, when called from streaming.js, 'this' is App.jsx */
  newRecordNotifier = (message) => {
      console.log('***newRecordNotifier');


      console.log('channel ',JSON.stringify(message.channel));
      console.log('object ',JSON.stringify(message.data.sobject));
      console.log('stagename ',message.data.sobject.StageName);
      console.log('Amount ',message.data.sobject.Amount);
      console.log('event type ',JSON.stringify(message.data.event.type));

      // somehow, it seemed we can't use "this.props.dispatch" here
      // this.props.dispatch(setNewRecord(message.data.sobject.StageName, message.data.sobject.Amount));

      // however, if we think about it, we shouldn't use dispatch here anyway, this.setState should be a better option here
      this.setState({
          newRecord: message.data.sobject
      });
  }

  /* defined like this, when called from streaming.js, 'this' is undefined */
  // newRecordNotifier(message){
  //   console.log('***newRecordNotifier');
  //   console.log('this ',this);
  // }

  render() {
    console.log('***render');
    console.log('this.props ',this.props);
    console.log('this.props.state: ',this.props.state);

    let stateWithAmount = this.props.state.stageWithAmount.toJSON();
    console.log('stateWithAmount: ',stateWithAmount);

    let newRecord = this.state.newRecord;
    console.log('newRecord: ',newRecord);

    return (
      <div className="app">

        <div className="banner">
          <p className="slds-text-heading--label slds-m-bottom--small">
            Salesforce Streaming API Demo
          </p>
        </div>

        <div className="content">

          <div className="control-panel">
            <Selector2 options={this.props.state.stagenames} dispatch={this.props.dispatch}/>
            <Buttons stagename={stateWithAmount.stagename}/>
          </div>

          <div className="chart">
            <div>
              <div id="chart_div"></div>
              <ChartRefresher data={stateWithAmount} record={newRecord}/>
            </div>
          </div>

        </div>

      </div>
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
