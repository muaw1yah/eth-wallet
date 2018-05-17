module.exports = {
    'secret': process.env.SECRET || "mydirtylittlesecret",
    'database': process.env.DATABASE_URI || "mongodb://localhost/eth-wallet",
    'PORT': process.env.PORT || 8080,
}