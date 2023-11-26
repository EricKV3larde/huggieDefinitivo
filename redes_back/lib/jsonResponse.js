function jsonResponse(statusCode, body) {
  return {
    statusCode,
    body,
  };
}

module.exports = { jsonResponse };



