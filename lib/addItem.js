const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

const async = require('async')

module.exports = function (req, res, next) {
  const {
    itemId,
    folderId
  } = req.params

  if (!folderId || !itemId) {
    return next(new Error('Missing Required Parameter'))
  }

  async.auto({
    getFolder: (cb) => {
      db.get(folderId, (err, doc) => {
        if (err) return cb(new Error('Error: internal or folderId invalid'))

        return cb(null, doc)
      })
    },
    getItem: (cb) => {
      db.get(itemId, (err, doc) => {
        if (err) return cb(new Error('Error: internal itemId is invalid'))

        return cb(null, doc)
      })
    }
  }, (err, result) => {
    if (err) return next(err)

    const doc = result.getFolder

    if (!doc.items) {
      doc.items = []
    }

    doc.items.push(itemId)
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
