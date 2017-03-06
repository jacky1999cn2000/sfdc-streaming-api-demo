'use strict';

module.exports = {

  drawChart: function(exVal, newVal, stageName){
    console.log('----drawChart');
    console.log('exVal ',exVal);
    console.log('newVal ',newVal);

    if(exVal == null){
      return;
    }

    let data = google.visualization.arrayToDataTable([
      ['Groups', 'Total Amount', { role: 'style' }],
      ['Initial Total', exVal, 'silver'],            // English color name
      ['New Total', newVal, 'gold']
    ]);

     // Set chart options
     let options = {'title':'Total Amount between Existing Opps and New Opps for StageName ' + stageName,
                    'width':800,
                    'height':300};

     // Instantiate and draw our chart, passing in some options.
     let chart = new google.visualization.BarChart(document.getElementById('chart_div'));
     chart.draw(data, options);
  }
}
