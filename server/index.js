const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const cookieparser = require('cookie-parser');

app.use(express.json());


app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5000"],
    credentials: true
}));


app.use(express.urlencoded());
app.use(cookieparser());




//Users Route
const usersRoute = require('./routes/Users');
app.use('/users', usersRoute);




app.listen(5000,()=>{
    console.log('Server started...');
})