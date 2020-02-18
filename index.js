const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')

const server = restify.createServer()

const cors = corsMiddleware({
  preflightMaxAge: 300,
  origins: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.bodyParser({ mapParams: true }))
server.use(restify.plugins.queryParser({ mapParams: true }))

const modules = {
  createFolder: require('./lib/createFolder.js'),
  addItem: require('./lib/addItem.js'),
  createTeam: require('./lib/createTeam.js'),
  createEmployee: require('./lib/createEmployee.js'),
  deleteEmployee: require('./lib/deleteEmployee.js'),
  getEmployeeItems: require('./lib/getEmployeeItems.js'),
  accessAssignments: require('./lib/accessAssignments'),
  addEmployee: require('./lib/addEmployee')
}


server.post('/folder', modules.createFolder)
server.post('/folder/:folderId/item/:itemId', modules.addItem)

server.post('/team', modules.createTeam)
server.post('/team/:teamId/employee/:employeeId', modules.addEmployee)

server.post('/employee', modules.createEmployee)
server.del('/employee/:employeeId', modules.deleteEmployee)
server.get('/employee/:employeeId/items', modules.getEmployeeItems)

server.get('/user/:userId/assignment/:assignedId', modules.accessAssignments.get)
server.post('/user/:userId/assignment/:assignedId', modules.accessAssignments.create)
server.put('/user/:userId/assignment/:assignedId', modules.accessAssignments.update)
server.del('/user/:userId/assignment/:assignedId', modules.accessAssignments.delete)


server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url)
})
