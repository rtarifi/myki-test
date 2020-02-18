const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')
const data = require('../testData.json')

const db = config.nano.db.use(config.dbName)

describe('addEmployee', function () {
  let teamId, employeeId, folderId, itemId1, itemId2

  // create employee
  before(function (done) {
    db.insert(data.employee, (err, insert) => {
      if (err || !insert) done(err)
      employeeId = insert.id
      done()
    })
  })

  // create team
  before(function (done) {
    db.insert(data.team, (err, insert) => {
      if (err || !insert) done(err)
      teamId = insert.id
      done()
    })
  })

  before(function (done) {
    db.insert(data.folder, (err, insert) => {
      if (err || !insert) done(err)
      folderId = insert.id
      done()
    })
  })

  before(function (done) {
    db.insert(data.item, (err, insert) => {
      if (err || !insert) done(err)
      itemId1 = insert.id
      done()
    })
  })

  before(function (done) {
    db.insert(data.item2, (err, insert) => {
      if (err || !insert) done(err)
      itemId2 = insert.id
      done()
    })
  })

  it('get employee items', function (done) {
    axios({
      method: 'GET',
      baseURL: config.baseURL,
      url: `/employee/${employeeId}/items`
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('items')

      done()
    }).catch(done)
  })

  after(function (done) {
    db.get(employeeId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
  after(function (done) {
    db.get(teamId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
  after(function (done) {
    db.get(folderId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
  after(function (done) {
    db.get(itemId1, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
  after(function (done) {
    db.get(itemId2, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
})
