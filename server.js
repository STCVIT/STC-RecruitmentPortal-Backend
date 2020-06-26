const express = require('express'); 
var cors = require('cors')
const mongoose = require('mongoose');   
const bodyParser = require('body-parser');
const passport = require('passport');   

const users = require('./routes/api/users');
const orgs = require('./routes/api/orgs');
const post = require('./question_route/posts');
const app = express()
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    }));

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true
        }).then(() => {
            console.log('MongoDB successfully connected');

        })
    .catch(err => {
            console.log(err)
        })

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/orgs', orgs);
app.use('/api/post', post);
app.get('/',(req,res)=>{
    res.send("Welcome to stc backend \n developed by pankaj")
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
