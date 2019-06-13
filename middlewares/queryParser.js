function queryParser(req, res, next) {
  req.parsedQuery = req.query;

  next();
}

module.exports = queryParser;