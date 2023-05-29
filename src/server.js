const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('MongoDB connected');
});

const catSchema = new mongoose.Schema({
name: String,
age: Number,
breed: String,
photoUrl: String,
location: String,
description: String
});
const Cat = mongoose.model('Cat', catSchema);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Endpoint to get all cat listings
app.get('/api/cats', async (req, res) => {
try {
const cats = await Cat.find();
res.json(cats);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Endpoint to create a new cat listing```
app.post('/api/cats', async (req, res) => {
try {
const cat = new Cat(req.body);
await cat.save();
res.json(cat);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Endpoint to get a specific cat listing by ID
app.get('/api/cats/:id', async (req, res) => {
try {
const cat = await Cat.findById(req.params.id);
if (!cat) {
res.status(404).json({ error: 'Cat not found' });
} else {
res.json(cat);
}
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Endpoint to update a specific cat listing by ID
app.put('/api/cats/:id', async (req, res) => {
try {
const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!cat) {
res.status(404).json({ error: 'Cat not found' });
} else {
res.json(cat);
}
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Endpoint to delete a specific cat listing by ID```
app.delete('/api/cats/:id', async (req, res) => {
try {
const cat = await Cat.findByIdAndDelete(req.params.id);
if (!cat) {
res.status(404).json({ error: 'Cat not found' });
} else {
res.json(cat);
}
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Start the server
app.listen(3000, () => {
console.log('Server started on port 3000');
});
