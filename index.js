
var moment = require('moment')

function def(str, d) {
  var num = parsers.number(str);
  return num === null? d : num;
}

function orN(str, d) {
  return str === ""? d : str;
}

function or1(str, d) {
  return orN(str, 1);
}

var parsers = module.exports = function(csv) {
  var parsed = {};
  parsed.name = csv.col('item name');
  parsed.type = csv.col('item type');
  parsed.upc = csv.col('upc');
  parsed.isrc = csv.col('isrc');
  parsed.artist = csv.col('artist');
  parsed.sales = parsers.number(or1(csv.col('quantity')));
  parsed.orderDate = parsers.orderDate(csv.col('order date'));
  parsed.referrer = csv.col('referrer url')
  parsed.buyer = {
    name: csv.col('buyer name'),
    phone: csv.col('buyer phone'),
    note: csv.col('buyer note'),
    email: csv.col('buyer email')
  }
  return parsed;
};

parsers.orderDate = function(str){
  return moment(str, 'M/D/YY h:mma').toDate();
}

parsers.number = require('parse-number').str;

parsers.paypal = function(str) {
  return def(str, 0);
}
