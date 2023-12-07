"use strict";

import Shop from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { KeyTokenService } from "./keyToken.service.js";
import createTokenPair from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";

const ROLE_SHOP = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

export default class AccessService {
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

                // simple way
                const privateKey = crypto.randomBytes(64).toString("hex");
                const publicKey = crypto.randomBytes(64).toString("hex");

                // store to database
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });

                console.log("Key store:", keyStore);

                if (!keyStore) {
                    return {
                        code: "xxxx",
                        message: "keyStore error",
                    };
                }

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

                console.log("Created Token Success:", tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
                        tokens,
                    },
                };
            }
            return {
                code: 201,
                metadata: null,
            };
        } catch (error) {
            return {
                code: "abc",
                message: error.message,
                status: "error",
            };
        }
    };
}
