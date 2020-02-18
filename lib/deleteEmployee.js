const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

module.exports = function (req, res, next) {
  const employeeId = req.params.employeeId

  if (!employeeId) {
    return next(new Error('Missing Required Parameter'))
  }

  db.view('team-employee', 'by_employeeId', {
    key: employeeId,
    include_docs: true
  }, (err, body) => {
    if (err || !body || !body.rows) return next(new Error('Internal Error'))

    if (!body.rows.length) {
      return next(new Error('Invalid Id'))
    }

    const docs = body.rows.map(row => {
      let doc = row.doc
      if (doc.type === 'employee') {
        doc._deleted = true

      } else if (doc.type === 'team' && doc.items) {
        let index = doc.items.findIndex(item => {
          return item === employeeId
        })

        if (index > -1) {
          doc.items.splice(index, 1)
        }
      }

      return doc
    })

    db.bulk({docs: docs}, (err, insert) => {
      if (err || !insert) return next(new Error('Internal Error'))

      let ERROR = null
      for (let i = 0; i < insert.length; i++) {
        let row = insert[i]
        if (!row.ok || row.error) {
          Error = 'Error Deleting Employee'
        }
      }

      if (ERROR) {
        return next(new Error(ERROR))
      }

      res.send({success: true})

      next()
    })
  })
}
