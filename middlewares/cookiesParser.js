function cookiesParser(req, res, next) {
  const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
  req.parsedCookies = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    req.parsedCookies[key] = value;
  }, {});

  next();
}

module.exports = cookiesParser;
