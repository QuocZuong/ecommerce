"use strict";
import AccessService from "../services/access.service.js";
import { Created } from "../core/success.response.js";
class AccessController {
    signUp = async (req, res, next) => {
        new Created({ message: "Sign up successfully", metadata: await AccessService.signUp(req.body) }).send(res);
        // return res.status(201).json(await AccessService.signUp(req.body));
    };
}

const accessController = new AccessController();
export default accessController;
