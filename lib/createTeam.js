const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

module.exports = function (req, res, next) {
  const name = req.params.name

  if (!name) {
    return next(new Error('Missing Required Parameter'))
  }

  const doc = {
    type: 'team',
    name,
    team: []
  }

  db.insert(doc, (err, insert) => {
    if (err || !insert || !insert.id) return next(new Error('Internal Error'))

    doc._id = insert.id
    doc._rev = insert.rev

    res.send({
      success: true,
      id: insert.id,
      doc: doc
    })
    next()
  })
}
