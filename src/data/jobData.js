const client = require("../../utils/contentful");

module.exports = async () => {
  return client
    .getEntries({ content_type: "resumeJob" })
    .then((entries) => {
      return entries.items;
    })
    .catch(console.error);
};
