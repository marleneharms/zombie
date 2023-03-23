class GeneralError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.httpCode = 500;
  }
  toJSON() {
    return serializeError({
      message: this.message,
    });
  }
}

class BadRequestError extends GeneralError {
  constructor(msg) {
    super(msg);
    this.name = "BadRequestError";
    this.message = msg;
    this.httpCode = 400;
  }
  toJSON() {
    return serializeError({
      name: this.name,
      message: this.message,
    });
  }
}

module.exports = {
  GeneralError,
  BadRequestError,
};
