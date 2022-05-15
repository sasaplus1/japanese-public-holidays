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

/**
 * filter out pasts
 *
 * @param {Date} date
 * @return {Function}
 */
function filterOutPasts(date) {
  /**
   * for csv-parse's on_record
   */
  return function filterOut(record) {
    const dateString = convertToIso8601(record.date);
    const dateTime = new Date(dateString);

    return dateTime.getTime() < date.getTime() ? null : record;
  };
}

/**
 * is date text maybe
 *
 * @param {string} text
 * @return {boolean}
 */
function isDateText(text) {
  return /^[\d/]+$/.test(text);
}

module.exports = {
  columns: ['date', 'name'],
  convertToIso8601,
  filterOutPasts,
  isDateText
};
