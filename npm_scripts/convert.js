/**
 * convert to ISO8601 date string
 *
 * @param {string} dateString
 * @return {string}
 */
function convertToIso8601(dateString) {
  const [year, month, day] = dateString.split('/');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

module.exports = {
  convertToIso8601
};
