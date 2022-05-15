const { parse: csvParse } = require('csv-parse');
const { stringify: csvStringify } = require('csv-stringify');

const { convertToIso8601 } = require('./convert');

const columns = ['date', 'name'];

process.stdin
  .pipe(
    csvParse({
      from_line: 2,
      columns
    })
  )
  .pipe(
    csvStringify({
      cast: {
        string(value) {
          return /^[\d/]+$/.test(value) ? convertToIso8601(value) : value;
        }
      },
      columns,
      delimiter: '\t',
      header: true
    })
  )
  .pipe(process.stdout);
