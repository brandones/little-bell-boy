var moment = require('moment');

THANKSGIVING = moment('2016-11-24');


personData = [
  {
    'name': 'dshack',
    'date': '2016-11-27'
  },
  {
    'name': 'claudia',
    'date': '2015-12-24'
  },
  {
    'name': 'dustin',
    'date': '2015-12-24'
  },
  {
    'name': 'dash',
    'date': '2015-12-23'
  },
  { 'name': 'tadhg',
    'date': '2015-12-05'
  }
  ];
  
dates = personData.map(p => moment(p.date))

function dateData () {
  res = personData.map(s => moment(s.date)).map(daysCountFromStrikeoutDate);
  return res;
}

function daysCountFromStrikeoutDate(date) {
  res = date.diff(thanksgiving(date.year()), 'days');
  console.log(`${date} is ${res} days after Thanksgiving`);
  return res;
}

function thanksgiving(year) {
  let nov22 = moment(`${year}-11-22`);  /* earliest possible Thanksigiving */
  var day = nov22;
  while(day.day() % 7 != 4) {  /* iterate until Thursday */
    day.add(1, 'day');
  }
  console.log(`Thanksigiving ${year}: ${day}`);
  return day;
}

function strikeouts() {
  in2016 = dates.filter(d => d.year() == 2016);
  return in2016.map(daysCountFromStrikeoutDate);
}

module.exports.personData = personData;
module.exports.strikeouts = strikeouts;
module.exports.dateData = dateData;
