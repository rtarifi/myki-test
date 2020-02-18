const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')
const data = require('../testData.json')

const db = config.nano.db.use(config.dbName)

describe('addItem', function () {
  let itemId, folderId

  // create folder
  before(function (done) {
    db.insert(data.folder, (err, insert) => {
      if (err || !insert) done(err)
      folderId = insert.id
      done()
    })
  })

  // create item 
  before(function (done) {
    db.insert(data.item, (err, insert) => {
      if (err || !insert) done(err)
      itemId = insert.id
      done()
    })
  })

  it('add item to folder', function (done) {
    axios({
      method: 'POST',
      baseURL: config.baseURL,
      url: `/folder/${folderId}/item/${itemId}`
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success', 'doc')

      done()
    }).catch(done)
  })

  after(function (done) {
    db.get(folderId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
  after(function (done) {
    db.get(itemId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
})
