const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')


var app = express();

app.use(cors());
app.use(bodyparser.json());
const port = 3001;

app.listen(port, () => console.log(`Server listening on port ${port}`))


app.get('/getsave', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'savefile.json'))
})

app.post('/sendsave', (req,res) => {
    var newsave = JSON.stringify(req.body)
    console.log(newsave)
    res.sendStatus(200);
    fs.writeFile('savefile.json', newsave, (err) => {
        if (err)
            console.log(err)
        else
            console.log('saved')
    })
})
