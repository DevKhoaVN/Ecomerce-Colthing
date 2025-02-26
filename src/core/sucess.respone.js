const StatusCode = {
  SUCESS: 200,
  CREATED: 201,
  NOT_CONTENT: 204,
};

const ReasonStatusCode = {
  SUCESS: "Success",
  CREATED: "Created Sucess",
  NOT_CONTENT: "SUCESS Not Content",
};
class SucessResponse {
  constructor({
    message,
    statusCode = StatusCode.SUCESS,
    reasonCode = ReasonStatusCode.SUCESS,
    metadata = {},
  }) {
    this.message = !message ? reasonCode : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class Sucess extends SucessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SucessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class NotContent extends SucessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

module.exports = { SucessResponse, Sucess, Created, NotContent };
