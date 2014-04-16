
# bandcamp-csv-parser

  Parse bandcamp csv files using [csv-record-parser](https://github.com/jb55/csv-record-parser)

  [![Build Status](https://travis-ci.org/monstercat/bandcamp-csv-parser.png)](https://travis-ci.org/monstercat/bandcamp-csv-parser)

## Installation

  Install with npm

    $ npm install bandcamp-csv-parser

## Example

```js
var record = require('csv-record-parser-stream')
var bandcamp = require('bandcamp-csv-parser')
var through = require('through');
var csv = require('csv-parse')

fs.createReadStream("file.csv")
.pipe(csv())
.pipe(record(bandcamp))
.pipe(through(function(sale){
  // handle data
}));
```


## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
