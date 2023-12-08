"use strict";

import httpStatusCode from "../utils/httpStatusCode.js";

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = httpStatusCode.ReasonPhrases.CONFLICT, statusCode = httpStatusCode.StatusCodes.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = httpStatusCode.ReasonPhrases.FORBIDDEN, statusCode = httpStatusCode.StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = httpStatusCode.ReasonPhrases.UNAUTHORIZED,
        statusCode = httpStatusCode.StatusCodes.UNAUTHORIZED,
    ) {
        super(message, statusCode);
    }
}

export { BadRequestError, ConflictRequestError, AuthFailureError };
