const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(object));
  res.end();
};

const respondXML = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'text/xml' });
  res.write(object);
  res.end();
};

const success = (req, res, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const resXML = `<response><message>${responseJSON.message}</message></response>`;

    return respondXML(req, res, 200, resXML);
  }

  return respondJSON(req, res, 200, responseJSON);
};

const badRequest = (req, res, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter, set equal to true';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let resXML = '<response>';
      resXML = `${resXML}<message>${responseJSON.message}</message>`;
      resXML = `${resXML}<id>${responseJSON.id}</id>`;
      resXML = `${resXML}</response>`;
      return respondXML(req, res, 400, resXML);
    }
    return respondJSON(req, res, 400, responseJSON);
  }

  if (acceptedTypes[0] === 'text/xml') {
    const resXML = `<response><message>${responseJSON.message}</message></response>`;

    return respondXML(req, res, 200, resXML);
  }

  return respondJSON(req, res, 200, responseJSON);
};

const notFound = (req, res, acceptedTypes, params) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let resXML = '<response>';
    resXML = `${resXML}<message>${responseJSON.message}</message>`;
    resXML = `${resXML}<id>${responseJSON.id}</id>`;
    resXML = `${resXML}</response>`;

    return respondXML(req, res, 404, resXML);
  }

  return respondJSON(req, res, 404, responseJSON);
};

const unauthorized = (req, res, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if(!params.loggedIn || params.loggedIn !== 'yes') {
  	if(acceptedTypes[0] === 'text/xml') {
  		let resXML = '<response>';
	    resXML = `${resXML}<message>${responseJSON.message}</message>`;
	    resXML = `${resXML}<id>${responseJSON.id}</id>`;
	    resXML = `${resXML}</response>`;
	    return respondXML(req, res, 401, resXML);
  	} else {
  		return respondJSON(req, res, 401, responseJSON);
  	}
  } else {
  	let newResponseJSON = {
  		message: 'You have successfully viewed the content.'
  	}
  	if(acceptedTypes[0] === 'text/xml') {
  		let resXML = '<response>';
	    resXML = `${resXML}<message>${newResponseJSON.message}</message>`;
	    resXML = `${resXML}</response>`;
	    return respondXML(req, res, 200, resXML);
  	} else {
  		return respondJSON(req, res, 200, newResponseJSON);
  	}
  }
};

const forbidden = (req, res, acceptedTypes, params) => {
	const responseJSON = {
		message: 'You do not have access to this content.',
		id: 'forbidden'
	};

	if(acceptedTypes[0] === 'text/xml') {
		let resXML = '<response>'
		resXML = `${resXML}<message>${responseJSON.message}</message>`;
		resXML = `${resXML}<id>${responseJSON.id}</id>`;
		resXML = `${resXML}</response>`;
		return respondXML(req, res, 403, resXML);
	} else {
		return respondJSON(req, res, 403, responseJSON);
	}
};

const notImplemented = (req, res, acceptedTypes, params) => {
	const responseJSON = {
		message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
		id: 'notImplemented'
	};

	if(acceptedTypes[0] === 'text/xml') {
		let resXML = '<response>'
		resXML = `${resXML}<message>${responseJSON.message}</message>`;
		resXML = `${resXML}<id>${responseJSON.id}</id>`;
		resXML = `${resXML}</response>`;
		return respondXML(req, res, 501, resXML);
	} else {
		return respondJSON(req, res, 501, responseJSON);
	}
};

const internal = (req, res, acceptedTypes, params) => {
	const responseJSON = {
		message: 'Internal Server Error. Something went wrong.',
		id:'internalError'
	};

	if(acceptedTypes[0] === 'text/xml') {
		let resXML = '<response>'
		resXML = `${resXML}<message>${responseJSON.message}</message>`;
		resXML = `${resXML}<id>${responseJSON.id}</id>`;
		resXML = `${resXML}</response>`;
		return respondXML(req, res, 500, resXML);
	} else {
		return respondJSON(req, res, 500, responseJSON);
	}
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  notImplemented,
  internal
};
