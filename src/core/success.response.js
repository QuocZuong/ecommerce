"use strict";

import httpStatusCode from "../utils/httpStatusCode.js";

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
};

const REASON_STATUS_CODE = {
    OK: "Success",
    CREATED: "Created",
};

class SuccessResponse {
    constructor(
        statusCode = httpStatusCode.StatusCodes.OK,
        reasonStatusCode = httpStatusCode.ReasonPhrases.OK,
        message = reasonStatusCode,
        metadata = {},
    ) {
        this.status = statusCode;
        this.message = message;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super(message, metadata);
    }
}

class Created extends SuccessResponse {
    constructor({
        message,
        metadata,
        statusCode = httpStatusCode.StatusCodes.CREATED,
        reasonStatusCode = httpStatusCode.ReasonPhrases.CREATED,
    }) {
        super(statusCode, reasonStatusCode, message, metadata);
    }
}

class Success extends SuccessResponse {
    constructor({ message, metadata }) {
        super(message, metadata);
    }
}

export { OK, Created, SuccessResponse, Success };
