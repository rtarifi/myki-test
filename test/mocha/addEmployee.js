const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')
const data = require('../testData.json')

const db = config.nano.db.use(config.dbName)

describe('addEmployee', function () {
  let teamId, employeeId

  // create employee
  before(function (done) {
    db.insert(data.employee2, (err, insert) => {
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

  it('add employee to team', function (done) {
    axios({
      method: 'POST',
      baseURL: config.baseURL,
      url: `/team/${teamId}/employee/${employeeId}`
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success', 'doc')

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
})
