const { parse: csvParse } = require('csv-parse');
const ltsv = require('ltsv');
const through2 = require('through2');

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
