module.exports = {
    'secret': process.env.SECRET || "mydirtylittlesecret",
    'database': process.env.DATABASE_URI || "mongodb://localhost/ethwallet",
    'PORT': process.env.PORT || 8080,
}