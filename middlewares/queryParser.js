function queryParser(req, res, next) {
  const query = req.headers.query ? req.headers.query.split('; ') : [];
  req.parsedQuery = {};
  query.forEach((query) => {
    const [key, value] = query.split('=');
    req.parsedQuery[key] = value;
  }, {});

  next();
}

module.exports = queryParser;