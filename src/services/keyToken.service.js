"use strict";

import keyToken from "../models/keytoken.model.js";

/* The KeyTokenService class is responsible for 
creating a key token using a user ID and public key + store it in database. */

export class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // convert public key from object to string to store in database
            // const tokens = await keyToken.create({
            //     user: userId,
            //     publicKey,
            //     privateKey,
            // });

            // return tokens ? tokens.publicKey : null;
            const filter = { user: userId },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokensUsed: [],
                    refreshToken,
                },
                options = { upsert: true, new: true };
            const tokens = await keyToken.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}
