const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://krs:COMP355@cluster0.fyhsy.mongodb.net/capstone?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
// const jsonParser = bodyParser.json();
const jsonParser = express.json();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let database = null;
let collection = null;

async function connectDB(){
	await client.connect();
	// define database 
	database = client.db("capstone");
	// define collections
	collection = database.collection("shapes-test");
}

connectDB();

// ------------- GET REQUESTS START -------------

// get all shapes
async function getAllShapes(req, res){
	const query = {};
	let shapesCursor = await collection.find(query);
	let shapes = await shapesCursor.toArray();
	console.log(shapes);

	// construct my response 
	const response = shapes;
	res.json(response);
}

app.get('/canvas', getAllShapes);

// get shape by id
async function getShape(req, res){
	const query = {_id: ObjectId(req.params.id)};
	let shapeCursor = await collection.find(query);
	let shape = await shapeCursor.toArray();
	// console.log(shape);

	// construct my response 
	const response = shape;
	res.json(response);
}

app.get('/display/:id', getShape);

// ------------- GET REQUESTS END -------------

// ------------- POST REQUESTS START -------------

// create a new shape
async function createNewShape(req, res){

	// console.log(req.params);

	// grab information being sent through body
	const color = req.body.color;
	const opacity = req.body.opacity;
	const shape = req.body.shape;
	const width = req.body.width;
	const height = req.body.height;
	const positioned = req.body.positioned;
	const x = req.body.x;
	const y = req.body.y;
	const complete = req.body.complete


	const newShape = {
		"color": color,
		"opacity": opacity,
		"shape": shape,
		"width": width,
		"height": height,
		"positioned": positioned,
		"x": x,
		"y": y,
		"complete": complete
	}

	const result = await collection.insertOne(newShape);

	console.log(result.insertedId);

	const response = {_id:result.insertedId};
	res.json(response);
}

app.post("/instructions/newShape", jsonParser, createNewShape);

// delete a shape
async function deleteShape(req, res){
	
	// console.log(req.params);

	const id = req.params.id;

	// console.log(id);

	// construct query
	const doc = {
		_id: ObjectId(id),
	}

	const result = await collection.deleteOne(doc);

	// console.log(result.toArray());

	const response = {deletedCount:result.deletedCount};
	res.json(response);
}

app.post("/shape/:id/deleteShape", jsonParser, deleteShape);

// update color
async function updateColor(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	const color = req.body.color

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			color: color
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/updateColor", jsonParser, updateColor);

// update opacity
async function updateOpacity(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	const opacity = req.body.opacity

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			opacity: opacity
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/updateOpacity", jsonParser, updateOpacity);

// update shape
async function updateShape(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	const shape = req.body.shape

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			shape: shape
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/updateShape", jsonParser, updateShape);

// update size
async function updateSize(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	const width = req.body.width;
	const height = req.body.height;

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			width: width,
			height: height
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/updateSize", jsonParser, updateSize);

// update position
async function updatePosition(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	const positioned = req.body.positioned
	const x = req.body.x;
	const y = req.body.y;

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			positioned: positioned,
			x: x,
			y: y
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/updatePosition", jsonParser, updatePosition);

// update status
async function markComplete(req, res){

	const id = ObjectId(req.params.id);
	// grab the new level that is being sent through body
	// const complete = req.body.complete;

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			complete: true
		}
	};

	const result = await collection.updateOne(filter, updateDocument);

	// http request code
	// matched count, modified count
	// construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount : result.modifiedCount}
	];

	res.json(response);
}

app.post("/create/:id/markComplete", jsonParser, markComplete);


// ------------- POST REQUESTS END -------------

app.listen(5000, function(){
	console.log("Server is running on port 5000");
})
