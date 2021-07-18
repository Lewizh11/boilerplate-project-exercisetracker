const { Router } = require('express')
const user = require('./controllers/Users')
const router = Router()

router.get('/api/users', user.getUsers)
router.get('/api/users/:_id/logs', user.getLog)

router.post('/api/users', user.createUser)
router.post('/api/users/:_id/exercises', user.addExercises)

module.exports = {
  router
}
