import React from 'react';
import Chart from '../utils/chart';

class ChartRefresher extends React.Component {

  constructor() {
      super(...arguments);
      this.state = {
        newValTotal: 0
      };
  }

  componentDidMount(){
    // load google charts package and set callback (these should only be run once)
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(Chart.drawChart);
  }

  componentWillReceiveProps(nextProps){
    console.log('***componentWillReceiveProps***');

    console.log('current props ', this.props);
    console.log('next props ', nextProps);

    // current stagename and next stagename will only be different when we change stages
    console.log('current stagename ', this.props.data.stagename);
    console.log('next stagename ',nextProps.data.stagename);

    // current amount and next amount will only be different when we change stages
    console.log('current amount ', this.props.data.amount);
    console.log('next amount ',nextProps.data.amount);

    console.log('current record ',this.props.record);
    console.log('record ',nextProps.record);

    console.log('newValTotal ',this.state.newValTotal);

    // first time select a stage or switch stages, use nextProps's stagename as stagename
    if(typeof this.props.data.stagename == 'undefined' || nextProps.data.stagename != this.props.data.stagename){
      console.log('--first time select a stage or switch stage --');
      this.setState({
          newValTotal: 0
      });
      Chart.drawChart(nextProps.data.amount, 0, nextProps.data.stagename);
    }

    // same stagename, so it should be a new record update
    if(typeof this.props.data.stagename != 'undefined' && nextProps.data.stagename == this.props.data.stagename){
      console.log('--record update --');

      // the following logic should be put in this block so we only handle record whose stagename matches the current stagename, but it's hard to test, so i'll comment it off
      // if(nextProps.record.StageName = this.props.data.stagename){
      // }

      this.setState({
          newValTotal: this.state.newValTotal + nextProps.record.Amount
      });
      // the reason we use "this.state.newValTotal + nextProps.record.Amount" is because the new value won't be available until next time we called this method
      Chart.drawChart(nextProps.data.amount, this.state.newValTotal + nextProps.record.Amount, nextProps.data.stagename);
    }

  }

  render() {
    return null;
  }

}

export default ChartRefresher;
