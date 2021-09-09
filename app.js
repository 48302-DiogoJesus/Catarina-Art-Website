/*
* '/:category/:htmlpage' => returns a content page from a category
* '/description/:picname' => returns the description of a picture (REMOVE - HARDCODE)
* '/photographs/get' => returns all the pictures from category 'photographs'
* '/slideshow/:projectName' => returns all the pictures related to the same project
*/

const fs = require('fs')

const express = require('express');
const app = express(); 

const port = process.env.PORT || 80;

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/paintings', (req, res) => {
    res.sendFile(__dirname + '/views/main-pages/paintings.html')
})
app.get('/photographs', (req, res) => {
  res.sendFile(__dirname + '/views/main-pages/photographs.html')
})
app.get('/sticks', (req, res) => {
  res.sendFile(__dirname + '/views/main-pages/sticks.html')
})
app.get('/about-me', (req, res) => {
  res.sendFile(__dirname + '/views/main-pages/about-me.html')
})

// FOR CONTENT PAGES
app.get('/:category/:htmlpage', (req, res) =>{
  var pageRequested = `${__dirname}/views/content-pages/${req.params.category}/${req.params.htmlpage}.html`
  fs.exists(pageRequested, (exists) => {
    if (exists) {
      res.sendFile(pageRequested)
    } else {
      res.status(404).send("404 Page Not Found")
    }
  })
})

// GET DESCRIPTION AND DISPLAY IN MAIN MENU
app.get('/description/:picname/one', (req,res) => {
  var filePath = null
  for (let pic of fs.readdirSync(__dirname + '/public/img/data/')) {
    let filename = pic.split('.').slice(0, -1).join('.')
    var find = `${__dirname}/public/img/data/${filename+'.desc'}`

    if (req.params.picname === filename) {
      filePath = find
      break;
    }
  }
  
  if (filePath != null) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(404).send('An error occurred while reading the file description')
      } else {
        let title = data.split('\n')[0]
        let description = data.split('\n').slice(2).toString()
        res.status(200).json({
          "title": title,
          "description": description
        })
      }
    })
  } else {
    res.status(404).send('Not found')
  }
})

// GET LIST OF PICTURES FOR 'PHOTOGRAHPS' SECTION ONLY
app.get('/photographs/get/all', (req, res) => {
  var pics = fs.readdirSync(`${__dirname}/public/img/photographs`)
  pics = pics.map(pic => `/img/photographs/${pic}`)
  
  res.json({
    "pics": pics
  })
})

// GET LIST OF PICTURES FOR DYNAMIC SLIDESHOW
app.get('/slideshow/:projectName/all', (req, res) => {
  var filesList = []
  const ignoreDirs = ['photographs']
  for (let dir1 of fs.readdirSync(__dirname + "/public/img/")) {
    
    if (dir1.includes('.') || ignoreDirs.includes(dir1)) continue;
    for (let pic of fs.readdirSync(__dirname + '/public/img/' + dir1)) {
      let filename = pic.split('.').slice(0, -1).join('.')
      if (filename.includes(req.params.projectName)) {
        if (!pic.includes('.desc')) {
          filesList.push(`/img/${dir1}/${pic}`)
        }
      }
    }
  }
  if (filesList.length > 0) res.status(200).json({"pics" : filesList})
})

// LISTENER
app.listen(port, () => {
  console.log('Express server listening on port', port)
})