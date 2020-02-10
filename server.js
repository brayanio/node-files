'use strict';
//libs
const
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'),
    expressValidator = require('express-validator'),
    fs = require('fs');

//config libs
const config = [
    express.static(path.join(__dirname, 'public')),
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    expressValidator()
].forEach(option=>app.use(option));


//setup data

let data = {};

const drivelist = require('drivelist');

drivelist.list((error, drives) => {
    if (error) throw error;
    data.drives = drives;
});

//dir loader
app.route('/dir').get((req, res) => {
    const params = req.query;
    let files = fs.readdirSync(params.path);
    let filePath, stats, isDir;
    files = files.map(name => {
        if(name.substr(0, 1) == '.')
            return false

        if(params.path.substr(params.path.length - 1) !== '/')
            params.path += '/'
        filePath = params.path + name
        stats = fs.statSync(filePath)
        isDir = stats.isDirectory()

        return {name, isDir}
    }).filter(e=>e);
    files.sort((a, b) => {
        if(a.isDir && !b.isDir)
            return -1
        if(!a.isDir && b.isDir)
            return 1
        if(a.name > b.name)
            return 1
        if(a.name < b.name)
            return -1
        return 0
    })
    res.send(JSON.stringify(files));
});

//file loader
app.route('/file').get((req, res) => {
    const params = req.query;
    let filePath, stats, isDir;

    filePath = params.path
    stats = fs.statSync(filePath)
    isDir = stats.isDirectory()
    console.log(stats);
    let name = params.path.split('/')
    name = name[name.length-1]
    let date = stats.birthtimeMs
    let modified = stats.mtimeMs
    let asset = filePath;

    let fileObj = {name, isDir, date, modified, asset}

    res.send(JSON.stringify(fileObj));
});

//asset loader
app.route('/asset').get((req, res) => {
    const params = req.query;
    console.log(params.path);
    res.sendFile(params.path);
});

//index loader
app.route('/').get((req, res) => {
    res.sendFile(`${__dirname}/src/index.html`);
});

//style loader
app.route('/gui').get((req, res) => {
    const params = req.query;
    res.sendFile(`${__dirname}/gui/${params.name}.css`);
});

//script loader
app.route('/src').get((req, res) => {
    const params = req.query;
    res.sendFile(`${__dirname}/src/${params.name}.js`);
});

//start Server
const server = app.listen(4200, () => console.log(`Listening to port ${server.address().port}`));
console.log('server.js')