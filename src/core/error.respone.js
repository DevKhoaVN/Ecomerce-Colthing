// Danh sách mã lỗi HTTP
const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Mô tả lỗi tương ứng
const ReasonStatusCode = {
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  CONFLICT: "Conflict Error",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  SERVICE_UNAVAILABLE: "Service Unavailable",
};

// Lớp cha cho tất cả lỗi
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

// Các class lỗi cụ thể
class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD_REQUEST) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = ReasonStatusCode.UNAUTHORIZED) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN) {
    super(message, StatusCode.FORBIDDEN);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = ReasonStatusCode.NOT_FOUND) {
    super(message, StatusCode.NOT_FOUND);
  }
}

class ConflictError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super(message, StatusCode.CONFLICT);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(message = ReasonStatusCode.INTERNAL_SERVER_ERROR) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

// Xuất các class lỗi để sử dụng trong project
module.exports = {
  StatusCode,
  ReasonStatusCode,
  ErrorResponse,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
