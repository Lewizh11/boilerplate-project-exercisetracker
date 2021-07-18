const { users } = require('../database')

const createUser = async (req, res) => {
  const username = req.body.username
  const exists = await users.exists({ username })
  
  if(exists)
    return res.send("Username already taken")

  const userCreated = await users({ username }).save()

  res.json({ username: userCreated.username, _id: userCreated._id })
}

const getUsers = async (_, res) => res.json(
  (await users.find())
  .map(user => ({ username: user.username, _id: user._id }))
)

const addExercises = async (req, res) => {
  const description = req.body.description
  const duration = req.body.duration
  const date = req.body.date
  const _id = req.params._id
  
  const currentDate = date ? new Date(date) : new Date() 
  await users.updateOne({ _id }, {
    $push: { exercises: [{
      description, date: currentDate.toDateString(), duration
    }]}
  })

  const user = await users.findOne({ _id })
  const exercise = user.exercises.pop()
  
  res.json({ 
    _id, username: user.username,
    date: exercise.date,
    duration: exercise.duration,
    description: exercise.description,
  })
}

const getLog = async (req, res) => {
  const _id = req.params._id
  const { from, to, limit } = req.query
  const { exercises, username } = await users.findOne({ _id })
  

  const logs = exercises
  .filter(exercise => {
    if(from && to) {
      const fromDate = new Date(from).getTime()
      const toDate = new Date(toDate).getTime()
      const exerciseDate = new Date(exercise.date).getTime()

      if(exerciseDate >= fromDate && exerciseDate <= toDate)
        return exercise
    }

    return exercise
  })
  .filter((exercise, index) => {
    if(limit){ 
      if(index < limit) return exercise
      return
    }
    return exercise
  })

  
  return res.json({
    _id, username,
    count: logs.length,
    log: logs
  })
}


module.exports = {
  createUser, getUsers, addExercises, getLog
}
