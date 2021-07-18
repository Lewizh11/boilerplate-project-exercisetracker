const { Router } = require('express')
const user = require('./controllers/Users')
const router = Router()

router.get('/api/users', user.getUsers)
router.get('/api/:_id/log', user.getLog)

router.post('/api/users', user.createUser)
router.post('/api/:_id/exercises', user.addExercises)

module.exports = {
  router
}
