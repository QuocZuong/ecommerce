"use strict";

import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Create this one to store public key
var keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            // To detect if hacker is using token
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const keyToken = model(DOCUMENT_NAME, keyTokenSchema);

export default keyToken;
