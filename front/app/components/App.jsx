import React from 'react';
import {connect} from 'react-redux';
import Remoting from '../utils/remoting';
import {initAmount, addAmount} from '../actions';

class App extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {};
  }

  componentWillMount(){
    Remoting.invoke('Qualification')
    .then((val) => {this.props.dispatch(initAmount(val))})
    .catch((err) => console.log('rejected: ', err));
  }

  render() {

    console.log('this.props.state: ',this.props.state);
    console.log('this.props.state.totalAmount: ',this.props.state.totalAmount);

    // {this.props.state.totalAmount}
    return (
      <div>sfdc-streaming-api {this.props.state.totalAmount}</div>
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
