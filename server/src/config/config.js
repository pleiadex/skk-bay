const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'skk-bay',
        user: process.env.DB_USER || 'skk-bay',
        password: process.env.DB_PASS || 'skk-bay',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../skk-bay.sqlite')
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'nXIVymkShc3QZZ9SF5MLbFO4r2a6Gnua1F03i5XAHXmBdoqEbA2VtT6r1np1aV3'
    }
}