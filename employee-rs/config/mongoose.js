const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/employee_db');//url of database

const db=mongoose.connection;//set connection

db.on('error',console.error.bind(console,'error on connection to database'));// if error 

db.once('open',function()
{
    console.log('Succesfully connected to database');//if success
})

