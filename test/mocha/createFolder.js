const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')

const db = config.nano.db.use(config.dbName)

describe('createFolder', function () {
  let id

  it('should create folder', function (done) {
    axios({
      method: 'POST',
      baseURL: config.baseURL,
      url: '/folder',
      params: {
        name: 'test-FOLDER1',
        description: 'testing create folder'
      }
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success', 'doc', 'id')

      id = response.data.id 

      done()
    }).catch(done)
  })

  after(function (done) {
    db.get(id, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
})
