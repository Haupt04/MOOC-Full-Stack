import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (request,response) => {
    try {
        const users = await User.find({}).populate('blogs') 
        response.status(200).json(users)
    } catch (error) {
        response.status(400).json({ error: 'Failed to get users'})
    }
})


router.post('/', async (request, response) => {
    try {
    const {username, name, password} = request.body

    if (!(username && name && password)) {
        return response.status(400).json({error: 'Must enter name/username/password'})
    }

    if (password.length < 3){
        return response.status(400).json({ error: 'Password must be longer then 3 letters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    response.status(400).json({ error: 'Failed to save User to database' })
  }
})


router.post('/login', async (request, response) => {
    try {
        const {username, password} = request.body

        const user = await User.findOne({username})
        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)){
            return response.status(401).json({error: 'Invalid username or password'})
        }        

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

        console.log(token)

        response.status(200).send({token, username: user.username, name:user.name})

    } catch (error) {
        response.status(400).json({error: 'Error with the login'})
    }
})


export default router;