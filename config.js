module.exports = {
    'secret': process.env.SECRET,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE_URI,
    'PORT': process.env.PORT || 8080,
    'ropsten': process.env.ROPSTEN_URL,
    'rinkeby': process.env.RINSKEBY_URL,
    'kovan': process.env.KOVAN_URI,
    'mainnet': process.env.MAINNET_URI
}