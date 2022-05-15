const { parse: csvParse } = require('csv-parse');
const { stringify: csvStringify } = require('csv-stringify');

const {
  columns,
  convertToIso8601,
  filterOutPasts,
  isDateText
} = require('./utils');

const isFutureOnly = process.argv[2] === '--future-only';

const csvParseOptions = {
  from_line: 2,
  columns
};

if (isFutureOnly) {
  csvParseOptions.on_record = filterOutPasts(new Date());
}

process.stdin
  .pipe(csvParse(csvParseOptions))
  .pipe(
    csvStringify({
      cast: {
        string(value) {
          return isDateText(value) ? convertToIso8601(value) : value;
        }
      },
      columns,
      delimiter: '\t',
      header: true
    })
  )
  .pipe(process.stdout);
