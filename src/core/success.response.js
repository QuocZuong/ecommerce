"use strict";

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
        statusCode = STATUS_CODE.OK,
        reasonStatusCode = REASON_STATUS_CODE.OK,
        message = reasonStatusCode,
        metadata = {},
    ) {
        this.message = message;
        this.status = statusCode;
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
        statusCode = STATUS_CODE.CREATED,
        reasonStatusCode = REASON_STATUS_CODE.CREATED,
    }) {
        super(statusCode, reasonStatusCode, message, metadata);
    }
}

export { OK, Created };
