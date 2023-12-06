"use strict";

import Shop from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const ROLE_SHOP = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // check is email exited

            const holderShop = await Shop.findOne({ email }).lean();

            if (holderShop) {
                return {
                    code: "xxxx",
                    message: "Shop already registered",
                };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newShop = await Shop.create({
                name,
                email,
                password: hashedPassword,
                roles: [ROLE_SHOP.SHOP],
            });

            if (newShop) {
                // create private key, public key
                const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                });

                await newShop.save();
            }
        } catch (error) {
            return {
                code: "abc",
                message: error.message,
                status: "error",
            };
        }
    };
}
