import express from 'express'
import path from 'path'
import cors from 'cors' 
//const user=require('./routes/user')
import user from './routes/user.js'
import {con} from "./config/connect.js"
import dotenv from 'dotenv'

//create a new express application
dotenv.config()
let app = express()


//DataBase Connection
con.connect(function(err) {
  if (err) {
    console.log("error is",err);
  }else{
    
    console.log("Connected to database");
  }
});

let port_number=process.env.port
app.use(cors())

app.use(express.json())

app.use('/user',user)

const dirname = path.resolve();

console.log(process.env.JWT_SECRET)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, 'frontend/build')));

  app.get('*', (req, res, next) =>
    res.sendFile(
      'index.html',
      { root: path.join(dirname, 'frontend/build') },
      (err) => {
        if (err) {
          console.log(err);
          next(err);
        }
      }
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}


// app.use(function (req, res, next) {
//     next(createError(404));
//     // throw new Error('routeError')
//   });
  
//   app.use((err, req, res, next) => {
//     console.log(err)
//     res.send("invalid page")
//   })

  app.listen(port_number,console.log("server running on port number",port_number))