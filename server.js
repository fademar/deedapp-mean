const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const path = require('path');

var ObjectID = mongodb.ObjectID;

// Db Collection and URI
const deedsCollection = 'Deeds';
const notesCollection = 'Notes';

// App Init
const app = express();
app.use(bodyParser.json());


// Enable CORS 
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Create a db const to reuse the connection
var db;

// Connection to the database
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) {
    console.log('the connection with the databas is impossible: ' + err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log('Database connection ready');

  db.collection(deedsCollection).createIndex({
    "$**": "text"
  });

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, () => {
    console.log('App now running on port', process.env.PORT);
  });

});



// DEEDS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({
    'error': message
  });
}

// Recursive function in nested JSON
function recursiveGetProperty(obj, lookup, callback) {
  for (property in obj) {
    if (property == lookup) {
      callback(obj[property]);
    } else if (obj[property] instanceof Object) {
      recursiveGetProperty(obj[property], lookup, callback);
    }
  }
}

// Redirect / to /api/deeds
app.get('/', (req, res) => {
  res.send('Please use /api/deeds');
});

/*  '/api/deeds'
 *    GET: finds all deeds
 *    POST: creates a new deed
 */

app.get('/api/deeds', (req, res) => {
  db.collection(deedsCollection).find({}).sort({
    $natural: -1
  }).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deeds.');
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/deeds', (req, res) => {
  var newDeed = req.body;

  if (!req.body.deedRef) {
    handleError(res, 'Invalid deed input. You must at least provide a Deed Reference', 400);
  }

  db.collection(deedsCollection).insertOne(newDeed, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to create new deed.');
    } else {

      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  '/api/deed/:id'
 *    GET: find deed by id
 *    PUT: update deed by id
 *    DELETE: deletes deed by id
 */

app.get('/api/deed/:id', (req, res) => {
  db.collection(deedsCollection).findOne({
    _id: new ObjectID(req.params.id)
  }, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deed');
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put('/api/deed/:id', (req, res) => {
  let updateDoc = req.body;
  delete updateDoc._id;

  db.collection(deedsCollection).updateOne({
    _id: new ObjectID(req.params.id)
  }, updateDoc, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to update deed');
    } else {
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/deed/:id', (req, res) => {
  db.collection(deedsCollection).deleteOne({
    _id: new ObjectID(req.params.id)
  }, (err, result) => {
    if (err) {
      handleError(res, err.message, 'Failed to delete contact');
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


// Get the last Document inserted

app.get('/api/lastdeed', (req, res) => {
  db.collection(deedsCollection).find({}).limit(1).sort({
    $natural: -1
  }).toArray((err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to get the last deed');
    } else {
      res.status(200).json(doc);
    }
  });
});

// Load JSON schema file

app.get('/api/schema', (req, res) => {
  let jsonFile = fs.readFileSync('./deed-schema copie.json', {
    encoding: 'utf8'
  });
  let jsonSchema = JSON.parse(jsonFile);
  res.status(200).json(jsonSchema);
});

/*  '/api/notes'
 *    GET: finds all notes
 *    POST: creates a new note
 */

app.get('/api/notes', (req, res) => {
  db.collection(notesCollection).find({}).toArray((err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to get notes.');
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post('/api/notes', (req, res) => {
  var newNote = req.body;

  db.collection(notesCollection).insertOne(newNote, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to create new note.');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


/*  '/api/note/:id'
 *    GET: find note by id
 *    PUT: update note by id
 *    DELETE: deletes note by id
 */

app.get('/api/note/:id', (req, res) => {
  db.collection(notesCollection).findOne({
    _id: new ObjectID(req.params.id)
  }, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to get note');
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put('/api/note/:id', (req, res) => {
  let updateNote = req.body;
  delete updateNote._id;

  db.collection(notesCollection).updateOne({
    _id: new ObjectID(req.params.id)
  }, updateNote, (err, doc) => {
    if (err) {
      handleError(res, err.message, 'Failed to update deed');
    } else {
      res.status(200).json(updateNote);
    }
  });
});

app.delete('/api/note/:id', (req, res) => {
  db.collection(notesCollection).deleteOne({
    _id: new ObjectID(req.params.id)
  }, (err, result) => {
    if (err) {
      handleError(res, err.message, 'Failed to delete note');
    } else {
      res.status(200).json(req.params.id);
    }
  });
});




/*  '/api/search'
 *    GET: search the db
 *
 */



app.get('/api/search', (req, res) => {
  let arrayBody = [];
  db.collection(deedsCollection).find({}).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deeds.');
    } else {
      res.status(200).json(arrayBody);
    }
  });
});

app.get('/api/search/:term', (req, res) => {
  let term = req.params.term;
  db.collection(deedsCollection).find({
    $text: {
      $search: term
    }
  }).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deeds.');
    } else {
      res.status(200).json(docs);
    }
  });
});

/*  '/api/firstnames'
 *    GET: retrieve distinct firstnames and order them
 *
 */
app.get('/api/firstnames', (req, res) => {
  db.collection(deedsCollection).distinct('agent.firstName', {
    agentSex: 'male'
  }, (err, docs) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deeds.');
    } else {
      docs.sort(new Intl.Collator('ru').compare);
      res.status(200).json(docs);
    }
  });
});

app.get('/api/firstnamesmale', (req, res) => {
  db.collection(deedsCollection).aggregate(
    [{
      $group: {
        _id: {
          "agent.firstName": "$agent.firsName"
        }
      }
    }]
  ).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, 'Failed to get deeds.');
    } else {
      docs.sort(new Intl.Collator('ru').compare);
      res.status(200).json(docs);
    }
  });
});

/*  '/api/schema-version'
 *    POST: update the database for schema version
 *
 */
app.get('/api/update-schema', (req, res) => {
  db.collection(deedsCollection).updateMany({}, {
    $set: {
      "schema-version": 1
    }
  }, (err, activity) => {
    if (err) {
      handleError(res, err.message, 'Failed to update the database');
    } else {
      res.status(200).json("Database updated with success");
    }
  });
});





app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
