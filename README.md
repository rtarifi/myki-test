
## How to run the project:  


runs server
```
npm run start
```
run couchdb & set up db
```
npm run setUpDB
```
run unit test
```
npm run test
```

## Dependencies:  
- Nano
  - Since couched and nano library go hand in hand.
- Restify
  - Framework to build scaleable RESTful web services.
- Mocha
  - Framework that allows asynchronous testing in a simple way.
- Couchdb database
  - CoucheDB because of its JSON based document format, which is easy to manage, and its fast indexing and tretriebal.
- Async
  - Straight-forward utility module that permits working asynchronous JavaScript.

## Assumptions made:  
  - Assumed lowest number for access level precedes higher numbers.
  - Assumed no user authentication was needed.
  - Didn’t account for paging.
  - Didn't validate ids in 2 APIs (addEmployee & accessAssignments.get APIs) before inserting in DB.

