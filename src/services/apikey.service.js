"use strict";

import crypto from "node:crypto";
import APIKey from "../models/apikey.model.js";

const findById = async (key) => {
    const newKey = await APIKey.create({ key: crypto.randomBytes(64).toString("hex"), permissions: ["0000"] });
    console.log(newKey);
    const objKey = await APIKey.findOne({ key, status: true });
    return objKey;
};

export { findById };
