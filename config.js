module.exports = {
    'secret': process.env.SECRET || "mydirtylittlesecret",
    'password': process.env.SECRET || "hithereigotyoumyfinefineloveyeah",
    'database': process.env.DATABASE_URI || "mongodb://localhost/ethwallet5",
    'PORT': process.env.PORT || 8080,
    'infura_ropsten': 'https://ropsten.infura.io/itRXy2X4KtzI7YZTq9wL',
    'infura_rinkeby': 'https://rinkeby.infura.io/itRXy2X4KtzI7YZTq9wL',
    'infura_kovan': 'https://kovan.infura.io/itRXy2X4KtzI7YZTq9wL',
    'infura_mainnet': 'https://mainnet.infura.io/itRXy2X4KtzI7YZTq9wL'
}