const nano = require('nano')('http://localhost:5984')
const db = nano.db.use('myki-test')

module.exports.create = function (req, res, next) {
  const {
    userId,
    assignedId,
    level
  } = req.params

  if (!userId || !assignedId || !level) {
    return next(new Error('Missing Required Parameter'))
  }

  db.get(userId, (err, doc) => {
    if (err) return next(new Error('Internal Error'))

    if (!doc.access) {
      doc.access = {} 
    }

    doc.access[assignedId] = level
    db.insert(doc, (err, insert) => {
      if (err || !insert || !insert.id) return next(new Error('Internal Error'))

      res.send({ success: true })
      next()
    })
  })
}

module.exports.update = function (req, res, next) {
  const {
    userId,
    assignedId,
    level
  } = req.params

  if (!userId || !assignedId || !level) {
    return next(new Error('Missing Required Parameter'))
  }

  db.get(userId, (err, doc) => {
    if (err) return next(new Error('Internal Error'))

    if (!doc.access || !doc.access[assignedId]) {
      return next(new Error('Item is not part of users access'))
    }

    doc.access[assignedId] = level
    db.insert(doc, (err, insert) => {
      if (err || !insert || !insert.id) return next(new Error('Internal Error'))

      res.send({ success: true })
      next()
    })
  })
}

module.exports.get = function (req, res, next) {
  const {
    userId,
    assignedId
  } = req.params

  if (!userId || !assignedId) {
    return next(new Error('Missing Required Parameter'))
  }

  db.get(userId, (err, doc) => {
    if (err) return next(new Error('Internal Error'))

    if (doc.access && doc.access[assignedId]) {
      res.send({
        userId,
        assignedId,
        accessLevel: doc.access[assignedId]
      })
      next()
    } else {
      return next(new Error('User has no access'))
    }
  })
}

module.exports.delete = function (req, res, next) {
  const {
    userId,
    assignedId
  } = req.params

  if (!userId || !assignedId) {
    return next(new Error('Missing Required Parameter'))
  }

  db.get(userId, (err, doc) => {
    if (err) return next(new Error('Internal Error'))

    if (!doc.access || !doc.access[assignedId]) {
      return next(new Error('Item is already not part of users access'))
    }

    delete doc.access[assignedId]
    db.insert(doc, (err, insert) => {
      if (err || !insert || !insert.id) return next(new Error('Internal Error'))

      res.send({ success: true })
      next()
    })
  })
}
