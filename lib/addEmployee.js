const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

module.exports = function (req, res, next) {
  const {
    teamId,
    employeeId
  } = req.params

  if (!employeeId || !teamId) {
    return next(new Error('Missing Required Parameter'))
  }

  db.get(teamId, (err, doc) => {
    if (err) return next(new Error('Internal Error'))

    if (!doc.team) {
      doc.team = []
    }

    doc.team.push(employeeId)
    db.insert(doc, (err, insert) => {
      if (err || !insert || !insert.id) return next(new Error('Internal Error'))

      doc._id = insert.id
      doc._rev = insert.rev

      res.send({
        success: true,
        doc: doc
      })
      next()
    })
  })
}
