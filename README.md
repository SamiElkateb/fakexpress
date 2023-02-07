# Fakexpress

In our 8th semester project, we are not allowed to use the express framework, or any other.
This can be used as a lightweight alternative to manage middlewares.

## Create a server
```javascript
const Fakexpress = require("./Fakexpress.js");
const fake = new Fakexpress();
fake.listen(8000);
```

## Add middlewares

```javascript
fake.get("/api/endPoint", (req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

fake.get("/api/endPoint", (req, res, next) => {
  console.log("Hello from middleware 2");
  res.end('Hello world');
});
```

You can also use other method
```javascript
fake.post("/api/endPoint", (req, res, next) => {
  res.end('Post hello world');
});

fake.put("/api/endPoint", (req, res, next) => {
  res.end('Put hello world');
});

fake.delete("/api/endPoint", (req, res, next) => {
  res.end('Delete hello world');
});
```

### Access request body
```javascript
fake.post("/api/endPoint", (req, res, next) => {
  const { data } = req.body;
  console.log(data);
  res.end('Data received');
});
```

### Integration with socket.io
```javascript
const Fakexpress = require('fakexpress');
const { Server } = require('socket.io');
const fake = new Fakexpress();
fake.listen(8000);
const io = new Server(fake.server());
```


