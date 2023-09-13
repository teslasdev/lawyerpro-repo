const express = require('express');
const cors =  require('cors');
const morgan = require("morgan");
const  useragent  = require("express-useragent");

const fs = require('fs');

const PORT = 8080

const app = express()
// Load environment variables via config.env if in development
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(cors());
app.use(useragent.express());


app.get('/', async (req, res) => {
   res.status(200).send({
     message: 'Hello from CodeX!'
   })
   console.log('Connected')
})


app.post('/history' , async (req, res) => {
   const { history , email , uid  } = req.body
   let hid = req.body.hid 
   fs.readFile('./history/'+uid+'.json' ,(err , data) => {
      if(data != undefined) {
         const fetchData = JSON.parse(data);
          const updatedJSON = {
            [hid] : history
         }
         if(fetchData[email].map((item , index) => {
            if(item.hasOwnProperty(hid)) {
               item = new Array();
            } else {
               console.log('no');
            }
         })) 
         // if(fetchData[email].filter(item => item[hid] == hid)) {
         //    console.log('yeah')
         //    for(let i = 0; i < fetchData[email].length ; i++) {
         //       fetchData[email][i][hid] = []
         //       fs.writeFile('./history/'+uid+'.json', JSON.stringify(fetchData), (err) => {
         //          if (err) console.log('Error writing file:', err);
         //       })
         //       fetchData[email][i][hid].push(updatedJSON)
         //       fs.writeFile('./history/'+uid+'.json', JSON.stringify(fetchData), (err) => {
         //          if (err) console.log('Error writing file:', err);
         //       })
         //    }
         // } else {
         //    console.log('ok')
            fetchData[email].push(updatedJSON)
            fs.writeFile('./history/'+uid+'.json', JSON.stringify(fetchData), (err) => {
               if (err) console.log('Error writing file:', err);
            })
         // }
      } else {
         const updatedJSON = {
            [email] : history
         }
         fs.writeFile('./history/'+uid+'.json', JSON.stringify(updatedJSON), (err) => {
            if (err) console.log('Error writing file:', err);
         })
      }
   })

})


app.listen(PORT, () => console.log(`Server running in production mode on port ${PORT}`));