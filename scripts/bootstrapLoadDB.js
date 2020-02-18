// set test databases

const path = require('path')
const bootstrap = require('couchdb-bootstrap') 

const COUCHDB_URL = 'http://localhost:5984'

const couchdbDir = path.join(process.cwd(), 'couchdb')

function couchdbBootstrap (url, dir) {
  return new Promise((resolve, reject) => {
    bootstrap(url, dir, {
      concurrency: 10
    }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

couchdbBootstrap(
    COUCHDB_URL,
    couchdbDir
).catch(e => {
    console.log(err)
}).then(() => {
    console.log('database is set')
})

