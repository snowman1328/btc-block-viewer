
const https = require("https");

exports.handler = function(event, context, callback) {
  const blockId = event.queryStringParameters.blockId;
  if (!blockId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing blockId" })
    });
    return;
  }

  https.get(`https://mempool.space/api/block/${blockId}/txids`, (res) => {
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
      body: JSON.stringify({ error: err.message })
    });
  });
};
