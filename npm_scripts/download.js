const download = require('download');
const iconvLite = require('iconv-lite');

const dataUrl = new URL(
  '/data/api/action/resource_show?id=d9ad35a5-6c9c-4127-bdbe-aa138fdffe42',
  'https://www.data.go.jp'
);

download(dataUrl.toString())
  .then(function (buffer) {
    const json = buffer.toString('utf8');
    const data = JSON.parse(json);

    const { url } = (data || {}).result;

    download(url)
      .pipe(iconvLite.decodeStream('cp932'))
      .pipe(iconvLite.encodeStream('utf8'))
      .pipe(process.stdout);
  })
  .catch(function (error) {
    process.exitCode = 1;
    console.error(error);
  });
