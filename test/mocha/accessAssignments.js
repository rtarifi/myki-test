const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')
const data = require('../testData.json')

const db = config.nano.db.use(config.dbName)

describe('accessAssignments', function () {
  let userId, assignedId

  // create user 
  before(function (done) {
    db.insert(data.employee, (err, insert) => {
      if (err || !insert) done(err)
      userId = insert.id
      done()
    })
  })

  // create item 
  before(function (done) {
    db.insert(data.item2, (err, insert) => {
      if (err || !insert) done(err)
      assignedId = insert.id
      done()
    })
  })

  it('create access', function (done) {
    axios({
      method: 'POST',
      baseURL: config.baseURL,
      url: `/user/${userId}/assignment/${assignedId}`,
      params: {
        level: 1
      }
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success')

      done()
    }).catch(done)
  })

  it('update access', function (done) {
    axios({
      method: 'PUT',
      baseURL: config.baseURL,
      url: `/user/${userId}/assignment/${assignedId}`,
      params: {
        level: 2
      }
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success')

      done()
    }).catch(done)
  })

  it('get access', function (done) {
    axios({
      method: 'GET',
      baseURL: config.baseURL,
      url: `/user/${userId}/assignment/${assignedId}`
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('userId', 'assignedId', 'accessLevel')

      done()
    }).catch(done)
  })

  it('delete access', function (done) {
    axios({
      method: 'DELETE',
      baseURL: config.baseURL,
      url: `/user/${userId}/assignment/${assignedId}`,
      params: {
        level: 1
      }
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success')

      done()
    }).catch(done)
  })

  after(function (done) {
    db.get(userId, (err, doc) => {
      if (err || !doc) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })

  after(function (done) {
    db.get(assignedId, (err, doc) => {
      if (err || !doc) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
})
