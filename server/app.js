const  express = require('express'),
        app = express(),
        bodyParser= require('body-parser'),
        converter = require('xml-js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })
app.get('/', (req, res) => {
    res.send("<h3>Welcome to the api</h3>")
  })  

  //to convert upper
  app.post('/upper', (req, res) => {
    let xmlString = Object.keys(req.body)[0] 
    console.log(xmlString) 
    let doc = converter.xml2json(xmlString, {compact: true, spaces: 4})
    doc = JSON.parse(doc)
    doc = doc.students.std
    let limit = doc.length
    let response = '<students>'
    if (limit === undefined) {
      response = response + '<std><name>' + doc.name._text.toUpperCase() + '</name><address>' + doc.address._text.toUpperCase() + '</address></std>'
    }else {
      for (let i = 0; i < limit; i++) {
        response = response + '<std><name>' + doc[i].name._text.toUpperCase() + '</name><address>' + doc[i].address._text.toUpperCase() + '</address></std>'
      }
    }
    response += '</students>'
    console.log(response)
    res.send(response)
  })
  // to convert lower
  app.post('/lower', (req, res) => {
    let xmlString = Object.keys(req.body)[0] 
    console.log(xmlString)  
    let doc = converter.xml2json(xmlString, {compact: true, spaces: 4})
    doc = JSON.parse(doc)
    doc = doc.students.std
    let limit = doc.length
    let response = '<students>'
    if (limit === undefined) {
      response = response + '<std><name>' + doc.name._text.toLowerCase() + '</name><address>' + doc.address._text.toLowerCase() + '</address></std>'
    }else {
      for (let i = 0; i < limit; i++) {
        response = response + '<std><name>' + doc[i].name._text.toLowerCase() + '</name><address>' + doc[i].address._text.toLowerCase() + '</address></std>'
      }
    }
    response += '</students>'
    console.log(response)
    res.send(response)
  })
  
  const PORT =3000
  app.listen(PORT, () => {
    console.log(`App started running on port : ${PORT}`)
  })
  