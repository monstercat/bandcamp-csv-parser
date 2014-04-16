
var moment = require('moment');

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

  parsed.name      = csv.col('item name');
  parsed.type      = csv.col('item type');
  parsed.upc       = csv.col('upc');
  parsed.isrc      = csv.col('isrc');
  parsed.artist    = csv.col('artist');
  parsed.net       = parsers.number(csv.col('net amount'));
  parsed.sales     = parsers.number(or1(csv.col('quantity')));
  parsed.orderDate = parsers.orderDate(csv.col('order date'));
  parsed.referrer  = csv.col('referrer url');

  parsed.buyer = {
    name: csv.col('buyer name'),
    phone: csv.col('buyer phone'),
    note: csv.col('buyer note'),
    email: csv.col('buyer email')
  };

  return parsed;
};

parsers.assert = function(bandcamp) {
  assert(bandcamp.name != null);
  assert(bandcamp.type != null);
  assert(bandcamp.referrer != null);
  assert(bandcamp.type === 'album' || bandcamp.type === 'track');
  assert(bandcamp.sales != null);
  assert(bandcamp.sales >= 0);
  assert(bandcamp.orderDate != null);
  assert(bandcamp.orderDate.getTime() < new Date().getTime());
  assert(bandcamp.buyer != null);
  assert(bandcamp.buyer.name != null);
  assert(bandcamp.buyer.note != null);
  assert(bandcamp.buyer.email != null);
  assert(bandcamp.upc != null);
  assert(bandcamp.artist != null);
  assert(bandcamp.isrc != null);
  assert(bandcamp.net != null);
}

parsers.orderDate = function(str){
  return moment(str, 'M/D/YY h:mma').toDate();
};

parsers.number = require('parse-number').str;

parsers.paypal = function(str) {
  return def(str, 0);
};

function eq(str){
  return function(item) { return item === str; };
}

parsers.identify = function(header) {
  return header.some(eq("order date"))  &&
         header.some(eq("buyer name"))  &&
         header.some(eq("buyer email")) &&
         header.some(eq("item type"))   &&
         header.some(eq("item name"));
};
