"use strict";
import AccessService from "../services/access.service.js";
import { Created, Success } from "../core/success.response.js";
class AccessController {
    login = async (req, res, next) => {
        console.log("AccessController return", await AccessService.login(req.body));
        new Success({
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    signUp = async (req, res, next) => {
        new Created({ message: "Sign up successfully", metadata: await AccessService.signUp(req.body) }).send(res);
        // return res.status(201).json(await AccessService.signUp(req.body));
    };
}

const accessController = new AccessController();
export default accessController;
