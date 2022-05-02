import Express from 'express'
import cors from 'cors' 
//const user=require('./routes/user')
import user from './routes/user.js'
import {con} from "./config/connect.js"
let port_number=process.env.port
//create a new express application
let app = Express()

//DataBase Connection
con.connect(function(err) {
  if (err) {
    console.log("error is",err);
  }else{

    console.log("Connected to database");
  }
});

app.use(cors())

app.use(Express.json())

app.use('/user',user)


// app.use(function (req, res, next) {
//     next(createError(404));
//     // throw new Error('routeError')
//   });
  
//   app.use((err, req, res, next) => {
//     console.log(err)
//     res.send("invalid page")
//   })

  app.listen(port_number,console.log("server running on port number",port_number))