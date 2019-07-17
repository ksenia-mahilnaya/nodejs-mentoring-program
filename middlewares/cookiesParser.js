function cookiesParser(req, res, next) {
  const cookies = res._headers['set-cookie'] ? res._headers['set-cookie'].split('; ') : [];
  req.parsedCookies = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    req.parsedCookies[key] = value;
  }, {});

  next();
}

module.exports = cookiesParser;
