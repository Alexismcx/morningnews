var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var request = require('sync-request')

var uid2 = require("uid2");

var userModel = require('../models/users')


router.post('/sign-up', async function (req, res, next) {

  const cost = 10

  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

  var error = []
  var result = false
  var saveUser = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }


  if (error.length == 0) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32)
    })

    var saveUser = await newUser.save()

    if (saveUser) {
      result = true
    }
  }


  res.json({ result, saveUser, error, token: saveUser.token })
})

router.post('/sign-in', async function (req, res, next) {

  

  var result = false
  var error = []

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    })


    var password = req.body.passwordFromFront

    if (user && bcrypt.compareSync(password, user.password)) {
      result = true
      res.json({ login: true, result, user, error });
    } else {
      error.push('email incorrect ou mdp incorrect')
      res.json({ login: false, error });
    }
    

  }

})

router.get('/screensource/:langue/:country', async function (req, res, next){
  var data = request("GET", `https://newsapi.org/v2/sources?language=${req.params.langue}&country=${req.params.country}&apiKey=${process.env.API_KEY}`) 
  var dataAPI = JSON.parse(data.body)

  res.json({sources: dataAPI.sources})
})

router.get('/screenarticlesbysource/:id', async function (req, res, next){
  var data = request("GET", `https://newsapi.org/v2/top-headlines?sources=${req.params.id}&apiKey=${process.env.API_KEY}`) 
  var dataAPI = JSON.parse(data.body)

  console.log(dataAPI);

  res.json({articles: dataAPI.articles})
})


module.exports = router;
