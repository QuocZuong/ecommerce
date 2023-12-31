"use strict";

import mongoose from "mongoose";
import { dev } from "../configs/config.mongodb.js";

class Database {
    // constructor() {
    //     this.connect();
    // }

    connect() {
        // for dev
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(dev.db.connectString)
            .then((_) => console.log("Connected to MongoDB"))
            .catch((err) => console.log("Connect failed", err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();

export default instanceMongoDB;
