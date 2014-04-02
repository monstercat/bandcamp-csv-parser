
var assert = require('better-assert');
var devnull = require('dev-null');
var csv = require('csv-parse');
var through = require('through');
var debug = require('debug')('parse-bandcamp-csv:test');
var join = require('path').join;
var parse = require('..');
var fs = require('fs');
var record = require('csv-record-parser-stream');

var file = process.env.BANDCAMP_TEST_CSV || join(__dirname, "bandcamp.csv")


describe('bandcamp csv parser', function(){
  it('parses date correctly', function(){
    var date = parse.orderDate("1/15/14 12:10pm")
    assert(date.getMonth() === 0);
    assert(date.getDate() === 15);
    assert(date.getSeconds() === 0);
    assert(date.getFullYear() === 2014);
    assert(date.getHours() === 12);
  });

  it('parses and types are ok', function(done){
    var first = true;

    csvFile(file, function(bandcamp){
      debug("row %j", bandcamp);
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

      return bandcamp;
    }, done);
  });
});

function csvFile(file, rowFn, done) {
  fs.createReadStream(file)
  .pipe(csv())
  .pipe(record(parse))
  .pipe(through(rowFn))
  .on('end', done);
}
