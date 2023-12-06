"use strict";

import JWT from "jsonwebtoken";

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token can be consider as a ATM card
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });

        // can consider as CCCD to backup
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("Error verify:", err);
            } else {
                console.log("Decode verify:", decode);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log("Error in createTokenPair" + error);
    }
};

export default createTokenPair;
