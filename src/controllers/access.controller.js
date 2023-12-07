"use strict";
import AccessService from "../services/access.service.js";
class AccessController {
    signUp = async (req, res, next) => {
        console.log(`[P]::signUp::`, req.body);
        return res.status(201).json(await AccessService.signUp(req.body));
    };
}

const accessController = new AccessController();
export default accessController;
