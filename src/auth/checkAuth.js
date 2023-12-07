import { findById } from "../services/apikey.service.js";

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};

// check api key get from header of request
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            return res.status(403).json({
                message: "Forbidden Error With API Key",
            });
        }

        // get object key from database and store to request
        const objKey = await findById(key);

        if (!objKey) {
            return res.status(403).json({
                message: "Forbidden Error With Object API Key",
            });
        }

        req.objKey = objKey;
        next();
    } catch (error) {
        console.log("apiKey,", error);
    }
};

const permission = (permission) => {
    return (req, res, next) => {
        // check if permission exit
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "don't have permission",
            });
        }

        // check if permission valid
        console.log("permissions:", req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission);

        if (!validPermission) {
            return res.status(403).json({
                message: "permission denied",
            });
        }

        return next();
    };
};

export { apiKey, permission };
