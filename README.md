
**CMD**
// runs server
```
npm run start
```

// run couchdb & set up db
```
npm run setUpDB
```

// run unit test
```
npm run test
```


Dependencies:
nano
- couched and nano library go hand in hand.
restify
- framework to build scaleable RESTful web services.
mocha
- framework that allows asynchronous testing in a simple way.

Database
- CoucheDB because of its JSON based document format, which is easy to manage,
  and its fast indexing and tretriebal

  Assumptions made:
  - assumed lowest number for access level precedes higher numbers.
  - assumed no user authentication was needed.
  - didn’t account for paging.

