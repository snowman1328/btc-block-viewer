
const https = require("https");

exports.handler = function(event, context, callback) {
  https.get("https://mempool.space/api/v1/blocks", (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      callback(null, {
        statusCode: 200,
        body: data
      });
    });
  }).on("error", err => {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: "Request failed", error: err.message })
    });
  });
};
