"use strict";

import Shop from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
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
                const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                });

                // store to database
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: "xxxx",
                        message: "publicKeyString error",
                    };
                }

                // convert public key from string to object
                const publicKeyObject = crypto.createPublicKey(publicKeyString);

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
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
