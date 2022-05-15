const { parse: csvParse } = require('csv-parse');
const prettier = require('prettier');
const through2 = require('through2');

const { convertToIso8601 } = require('./convert');

const holidays = [];

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

    holidays.push({
      date: convertToIso8601(date),
      name
    });
  })
  .on('end', function () {
    process.stdout.write(
      prettier.format(
        [
          'export type Holiday = { date: string; name: string };',
          '',
          `export const holidays: Holiday[] = ${JSON.stringify(
            holidays,
            null,
            2
          )};`
        ].join('\n'),
        { filepath: 'data.ts', parser: 'typescript' }
      )
    );
  });
