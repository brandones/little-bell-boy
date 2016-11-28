// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('ready');
  $.get('/data', function(data) {
    console.log(data);
    renderPersonData(data);
    renderCurves(data);
    renderDistributions(data);
  });
});

function renderPersonData(data) {
  let res = data.person_data;
    for (let item of res) {
      var row = $('<tr>');
      row.append($('<td>' + item.name + '</td>'));
      row.append($('<td>' + item.date + '</td>'));
      $('#person-data').append(row);
    }
}

function renderCurves(data) {
  labels = [{
            "text":"🦃",
            "font-size":"22",
            "x":"4%",
            "y":"87%"
          },
          {
            "text":"🎄",
            "font-size":"22",
            "x":"95%",
            "y":"87%"
          }]
  for (let d of data.strikeouts) {
    x_percent = 4 + 2.9 * d;
    console.log(x_percent);
    labels.push({
      "text": "👦",
      "font-size": "22",
      "x": `${x_percent}%`,
      "y": "80%"
    })
  }
  zingchart.render({
      id: 'curve',
      data: {
        type: 'line',
        legend: {},
        labels: labels,
        series: [{
          values: data.prior_curve,
          text: "Prior"
        },
        {
          values: data.posterior_curve,
          text: "Posterior"
        }]
      }
  });  
}

function renderDistributions(data) {
  prior = data.prior_dist;
  $('#prior-dist').text(`Γ(${prior[0]}, ${prior[1]})`);
  posterior = data.posterior_dist;
  $('#posterior-dist').text(`Γ(${posterior[0]}, ${posterior[1]})`);
}