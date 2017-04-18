const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const elasticsearch = require('elasticsearch');

var ObjectID = mongodb.ObjectID;

// Db Collection and URI
const deedsCollection = 'Deeds';
const dbUri = 'mongodb://fademar:Deeds75014$@deeds0-shard-00-00-dnewh.mongodb.net:27017,deeds0-shard-00-01-dnewh.mongodb.net:27017,deeds0-shard-00-02-dnewh.mongodb.net:27017/deeds?ssl=true&replicaSet=Deeds0-shard-0&authSource=admin'
const port = 3000;

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

// Create a db const to reuse the connection
var db;

// Connection to the database
mongodb.MongoClient.connect(dbUri, (err, database) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	// Save database object from the callback for reuse.
	db = database;
	console.log('Database connection ready');

	// Initialize the app.
	var server = app.listen(port, () => {
		console.log('App now running on port', port);
	});

});

// Initialize ElasticSearch Client
const esClient = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'error'
});

const bulkIndex = function bulkIndex(index, type, data) {
	let bulkBody = [];

	data.forEach(item => {
		item.id = item._id;
		delete item._id;

		bulkBody.push({
			index: {
				_index: index,
				_type: type,
				_id: item.id
			}
		});
		bulkBody.push(item);
	});

	esClient.bulk({ body: bulkBody })
		.then(response => {
			console.log('here');
			let errorCount = 0;
			response.items.forEach(item => {
				if (item.index && item.index.error) {
					console.log(++errorCount, item.index.error);
				}
			});
			console.log(
				`Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
			);
		})
		.catch(console.err);
};


// DEEDS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
	console.log('ERROR: ' + reason);
	res.status(code || 500).json({ 'error': message });
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
	db.collection(deedsCollection).find({}).toArray((err, docs) => {
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
	db.collection(deedsCollection).findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
		if (err) {
			handleError(res, err.message, 'Failed to get deed');
		} else {
			res.status(200).json(doc);
		}
	});
});

app.put('/api/deed/:id', (req, res) => {
	var updateDoc = req.body;
	delete updateDoc._id;

	db.collection(deedsCollection).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, (err, doc) => {
		if (err) {
			handleError(res, err.message, 'Failed to update deed');
		} else {
			res.status(200).json(updateDoc);
		}
	});
});

app.delete('/api/deed/:id', (req, res) => {
	db.collection(deedsCollection).deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
		if (err) {
			handleError(res, err.message, 'Failed to delete contact');
		} else {
			res.status(200).json(req.params.id);
		}
	});
});


// Get the last Document inserted

app.get('/api/lastdeed', (req, res) => {
	db.collection(deedsCollection).find({}).limit(1).sort({ $natural: -1 }).toArray((err, doc) => {
		if (err) {
			handleError(res, err.message, 'Failed to get the last deed');
		} else {
			res.status(200).json(doc);
		}
	});
});

// Load JSON schema file

app.get('/api/schema', (req, res) => {
	let jsonFile = fs.readFileSync('./deed-schema copie.json', { encoding: 'utf8' });
	let jsonSchema = JSON.parse(jsonFile);
	res.status(200).json(jsonSchema);
});

app.get('/api/search', (req, res) => {
	let arrayBody = [];
	db.collection(deedsCollection).find({}).toArray((err, docs) => {
		if (err) {
			handleError(res, err.message, 'Failed to get deeds.');
		} else {
  			bulkIndex('deeds', 'deed', docs);
			res.status(200).json(arrayBody);
		}
	});
});

app.get('/api/search/:term', (req, res) => {
	esClient.search({
		index: 'deeds',
		q: req.params.term
	}).then(function (resp) {
    	let hits = resp.hits.hits;
		res.status(200).json(hits);
	}, function (err) {
    	handleError(res, err.message, 'Failed to get deeds.');
	});
});