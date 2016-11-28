var stats = require('jStat').jStat;
var _ = require('lodash');

DAYS = 32;
PRIOR_SHAPE = 2;
PRIOR_RATE = 0.1;  /* aka β */

function threshold(val) {
  return val > 0.0001 ? val : 0;
}

function _gamma_pdf_data(shape, rate, days) {  /* Doesn't work??? */
  pdf_partial = _.partialRight(stats.gamma.pdf, shape, 1/rate);
  pdf_data = _.range(days).map(pdf_partial).map(threshold);
  return pdf_data;
}

function gamma_pdf_data(shape, rate, days) {
  var res = [];
  for (let i = 0; i < DAYS; i++) {
    res.push(stats.gamma.pdf(i, shape, 1/rate));
  }
  return res;
}

function prior_parameters() {
  return [PRIOR_SHAPE, PRIOR_RATE];
}

function posterior_parameters(data) {
  posterior_shape = PRIOR_SHAPE + _.sum(data);
  posterior_rate = PRIOR_RATE + data.length;
  console.log(`Posterior Γ(${posterior_shape}, ${posterior_rate})`);
  return [posterior_shape, posterior_rate];
}

function plot(dist) {
  res = gamma_pdf_data(dist[0], dist[1], DAYS).map(threshold);
  return res;
}

module.exports.prior_parameters = prior_parameters;
module.exports.posterior_parameters = posterior_parameters;
module.exports.plot = plot;