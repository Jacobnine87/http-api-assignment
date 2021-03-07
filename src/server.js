const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = req.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res, acceptedTypes, params);
  } else {
    urlStruct.notFound(req, res, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);