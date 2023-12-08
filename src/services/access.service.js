"use strict";

import bcrypt from "bcrypt";
import crypto from "node:crypto";
import Shop from "../models/shop.model.js";
import { KeyTokenService } from "./keyToken.service.js";
import createTokenPair from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import { AuthFailureError, BadRequestError } from "../core/error.response.js";
import { findByEmail } from "./shop.service.js";
import generatePublicPrivateKey from "../utils/generatePublicPrivateKey.js";

const ROLE_SHOP = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

export default class AccessService {
    /**
     *
     * check email in database
     * match password
     * create AT vs RT and save it
     * generate tokens
     * get data return login
     */
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });

        if (!foundShop) throw new BadRequestError("Shop not found");

        console.log("input password", password);
        const match = await bcrypt.compare(password, foundShop.password);
        console.log("match result: ", match);

        if (!match) throw new AuthFailureError("Authentication error");
        const { privateKey, publicKey } = generatePublicPrivateKey();

        const { _id: userId } = foundShop;
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({
            userId,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
        });

        return {
            shop: getInfoData({ fields: ["_id", "name", "email"], object: foundShop }),
            tokens,
        };
    };

    static signUp = async ({ name, email, password }) => {
        // check is email exited
        const holderShop = await Shop.findOne({ email }).lean();
        if (holderShop) {
            throw new BadRequestError("Shop already registered");
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
            const { privateKey, publicKey } = generatePublicPrivateKey();

            // store to database
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            console.log("Key store:", keyStore);

            if (!keyStore) {
                throw new BadRequestError("keyStore error");
            }

            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

            console.log("Created Token Success:", tokens);

            return {
                shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
                tokens,
            };
        }
        return {
            code: 201,
            metadata: null,
        };
    };
}
