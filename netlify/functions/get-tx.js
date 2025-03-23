
const https = require("https");

exports.handler = function(event, context, callback) {
  const txid = event.queryStringParameters.txid;
  if (!txid) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing txid" })
    });
    return;
  }

  https.get(`https://mempool.space/api/tx/${txid}`, (res) => {
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
