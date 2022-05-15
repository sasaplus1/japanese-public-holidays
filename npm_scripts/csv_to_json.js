const { parse: csvParse } = require('csv-parse');
const through2 = require('through2');

const { columns, convertToIso8601, filterOutPasts } = require('./utils');

const holidays = [];

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
    through2({
      objectMode: true
    })
  )
  .on('data', function (data) {
    const { date, name } = data;

    holidays.push({
      date: convertToIso8601(date),
      name
    });
  })
  .on('end', function () {
    process.stdout.write(JSON.stringify({ holidays }));
  });
