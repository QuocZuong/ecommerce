import crypto from "node:crypto";
const generatePublicPrivateKey = () => {
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    return { privateKey, publicKey };
};

export default generatePublicPrivateKey;
