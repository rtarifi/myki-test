const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

module.exports = function (req, res, next) {
  const employeeId = req.params.employeeId

  if (!employeeId) {
    return next(new Error('Missing Required Parameter'))
  }

  db.view('team-employee', 'by_access', {
    startkey: [employeeId],
    endkey: [employeeId, {}],
    include_docs: true
  }, (err, body) => {
    if (err || !body || !body.rows) return next(new Error('Internal Error'))

    if (!body.rows.length) {
      res.send({
        items: []
      })
      next()
    }

    const keys = []
    const accessLevel = {}
    const items = {}

    function setAccessLevel(key, level) {
      if (!accessLevel[key]) {
        accessLevel[key] = level
      } else if (accessLevel[key] > level) {
        accessLevel[key] = level
      }
    }

    body.rows.forEach(row => {
      let doc = row.doc,
          value = row.value

      if (doc.type === 'folder') {
        for (let i in doc.items) {
          // push [folderId, itemId]
          keys.push([doc._id, doc.items[i]])
          setAccessLevel(doc.items[i], value.level)
        }
      } else if (doc.type === 'item') {
        setAccessLevel(doc._id, value.level)
        items[doc._id] = {
          doc: doc,
          level: accessLevel[doc._id]
        }
      }
    })

    db.view('folder', 'by_items', {
      keys: keys,
      include_docs: true
    }, (err, body) => {
      if (err || !body || !body.rows) return next(new Error('Internal Error'))

      body.rows.forEach(row => {
        let doc = row.doc
        if (!items[doc._id]) {
          items[doc._id] = {
            doc: doc,
            level: accessLevel[doc._id]
          }
        }
      })

      res.send({items})
      next()
    })
  })
}
