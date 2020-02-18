
// params can be replace later with process.argv params in order to run tests on
// different ports & dbs
module.exports = {
  baseURL: 'http://localhost:8080',
  nano: require('nano')('http://localhost:5984'),
  dbName: 'myki-test'
}
