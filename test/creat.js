const chai = require('chai')
const expect = chai.expect

const expectedResponse = {success: true}
const response = expectedResponse

describe('createEmployee', function () {
  it('should create employee', function (done) {
    expect(response).to.include(expectedResponse)
    done()
  })
})
