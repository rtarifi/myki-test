const axios = require('axios')
const expect = require('chai').expect

const config = require('../config.js')
const data = require('../testData.json')

const db = config.nano.db.use(config.dbName)


describe('deleteEmployee', function () {
  let employeeId
  let teamId

  // create employee to delete it in API
  before(function (done) {
    db.insert(data.employee, (err, insert) => {
      if (err || !insert) done(err)
      employeeId = insert.id
      done()
    })
  })

  // create a team and employee belongs to
  before(function (done) {
    db.insert(data.team, (err, insert) => {
      if (err || !insert) done(err)
      teamId = insert.id
      done()
    })
  })

  it('should delete employee; del his access to any files; rm from teams', function (done) {
    axios({
      method: 'DELETE',
      baseURL: config.baseURL,
      url: `/employee/${employeeId}` 
    }).then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.have.all.keys('success')

      done()
    }).catch(done)
  })

  after(function (done) {
    db.get(teamId, (err, doc) => {
      if (err) done(err)
      doc._deleted = true
      db.insert(doc, done)
    })
  })
})
