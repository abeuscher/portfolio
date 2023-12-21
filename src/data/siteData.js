const client = require("../../utils/contentful");

module.exports = async () => {
  return client
    .getEntry("aSyxQSr91snDBsVvXiol5")
    .then((entry) => {
      return entry.fields;
    })
    .catch(console.error);
};
