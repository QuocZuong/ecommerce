const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        connectString: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.h6fx5xr.mongodb.net/?retryWrites=true&w=majority`,
    },
};

const pro = {
    app: {
        port: process.env.PRO_APP_PORT,
    },
    db: {
        connectString: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.h6fx5xr.mongodb.net/?retryWrites=true&w=majority`,
    },
};

export { dev, pro };
