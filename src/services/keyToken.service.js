"use strict";

import keyToken from "../models/keytoken.model.js";

/* The KeyTokenService class is responsible for 
creating a key token using a user ID and public key + store it in database. */

export class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            // convert public key from object to string to store in database
            const tokens = await keyToken.create({
                user: userId,
                publicKey,
                privateKey,
            });

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}
