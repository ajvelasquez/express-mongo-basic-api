module.exports = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        name: "dev",
        port: 27017,
        host: "mongo",
        user: null,
        pass: null,
    }
}