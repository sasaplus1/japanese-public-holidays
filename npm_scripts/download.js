const download = require('download');
const iconvLite = require('iconv-lite');

const dataUrl = new URL(
  '/chosei/shukujitsu/syukujitsu.csv',
  'https://www8.cao.go.jp'
);

async function main() {
  try {
    await download(dataUrl)
      .pipe(iconvLite.decodeStream('cp932'))
      .pipe(iconvLite.encodeStream('utf8'))
      .pipe(process.stdout);
  } catch (error) {
    process.exitCode = 1;
    console.log(error);
  }
}
main();
