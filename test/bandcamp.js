
var assert  = require('better-assert');
var devnull = require('dev-null');
var csv     = require('csv-parse');
var through = require('through');
var debug   = require('debug')('parse-bandcamp-csv:test');
var join    = require('path').join;
var parse   = require('../');
var fs      = require('fs');
var record  = require('csv-record-parser-stream');

var file = process.env.BANDCAMP_TEST_CSV || join(__dirname, "bandcamp.csv");


describe('bandcamp csv parser', function(){
  it('parses date correctly', function(){
    var date = parse.orderDate("1/15/14 12:10pm");
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
      parse.assert(bandcamp);

      return bandcamp;
    }, done);
  });

  describe("header identifier", function(){
    it("matches", function(done){
      var stream = fs.createReadStream(file)
      .pipe(csv())
      .pipe(through(function(header){
        debug("identify header %j", header);
        assert(parse.identify(header) === true);
        stream.end();
        done();
      }));
    });
  });
});

function csvFile(file, rowFn, done) {
  fs.createReadStream(file)
  .pipe(csv())
  .pipe(record(parse))
  .pipe(through(rowFn))
  .on('end', done);
}
