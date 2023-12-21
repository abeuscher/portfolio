require("dotenv");
const { DateTime } = require("luxon");

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  prettyjson: (data) => {
    return JSON.stringify(data, undefined, 2);
  },
};
