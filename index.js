require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const BlogPost = require('./models/Blog.js');

// Connect to database:
// mongoose.connect(process.env.MONGO_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true
// })
mongoose.connect(`mongodb://localhost/mongooseAssociation`);

const db = mongoose.connection;
// console.log(db);

db.once('open', () => {
  console.log(`Connection to MongoDB on ${db.host}:${db.port}`);
})

db.on('error', (err) => {
  console.log(`Error`, err);
})

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Home Route, Backend');
})

app.get('/blog', (req, res) => {
  // one way to create:
  BlogPost.create({
    title: 'Mongoose for all Mongoose',
    body: 'This is a cool post about Mongoose and MongoDB'});
    // OR:
  const firstPost = new BlogPost({ title: 'SEI 10-19', body: 'Software Engineers are cool.'});
  firstPost.save();
  res.send('Post completed');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})
