const { parse: csvParse } = require('csv-parse');
const ltsv = require('ltsv');
const through2 = require('through2');

const { columns, convertToIso8601, filterOutPasts } = require('./utils');

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

    process.stdout.write(
      ltsv.format({
        date: convertToIso8601(date),
        name
      }) + '\n'
    );
  });
