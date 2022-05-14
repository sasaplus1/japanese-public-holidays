const { parse: csvParse } = require('csv-parse');
const through2 = require('through2');

const { convertToIso8601 } = require('./convert');

const holidays = [];

process.stdin
  .pipe(
    csvParse({
      from_line: 2,
      columns: ['date', 'name']
    })
  )
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
