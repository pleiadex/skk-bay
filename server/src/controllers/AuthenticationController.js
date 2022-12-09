const {User} = require('../models')
// const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
  async register (req, res) {
    try {
      const {
        name, 
        password,
        phonenumber  
      } = req.body

      // register the user
      if (
        name.length <= 0 ||
        !name.match(/^[0-9a-zA-Z_-]+$/)
        ) {
          return res.status(400).send({
            error: 'The username is empty or does not match to combination of alphabet, numerical, hypen or underscore.'
          }
          )
      }

      if (password.length <= 0) {
        return res.status(400).send({
          error: 'The password is empty.'
        })
      }

      const regexPhonenumber = phonenumber
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)

      if(!regexPhonenumber.includes('-')) {
        return res.status(400).send({
          error: 'The phone number has invalid format.'
        })
      }
      const newUserData = {
        name: name,
        password: password,
        phonenumber: regexPhonenumber,
        isAdmin: false
      }
      const newUser = await User.create(newUserData)
      const newUserJson = newUser.toJSON()
      res.send({
        user: newUserJson,
        token: jwtSignUser(newUserJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: "An error has occured while trying to register. Please try with a different username."
      })
    }  
  },
  async login (req, res) {
    try {
      const {name, password} = req.body

      const user = await User.findByPk(name)
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Password is incorrect.'
        })
      }
      
      // Send user info back
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })      
    } catch (err) {
      res.status(500).send({
        error: "Login failed"
      })
    }    
  },
  async get (req, res) {
    try {
      // const userName = req.user.name
      const userName = req.params.name
      const result = {}
  
      // Check user info is correct
      const user = await User.findByPk(userName)

      // If the user does not exsit
      if (!user) {
        return res.status(400).send({
          error: 'The account is not found.'
        })
      }
      result.name = user.name
      result.phonenumber = user.phonenumber
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to change your info'
      })
    }
  },
  async edit (req, res) {
    try {
      const userName = req.user.name
      const userNamefromQuery = req.params.name
      const {password, phonenumber} = req.body

      if (
        userName !== userNamefromQuery &&
        !req.user.isAdmin
      ) {
        return res.status(400).send({
          error: 'You have no permission.'
        })
      }

      if (password.length <= 0) {
        return res.status(400).send({
          error: 'The password is empty.'
        })
      }

      const regexPhonenumber = phonenumber
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)

      if(!regexPhonenumber.includes('-')) {
        return res.status(400).send({
          error: 'The phone number has invalid format.'
        })
      }
      // Check user info is correct
      const user = await User.findByPk(userNamefromQuery)

      // If the user does not exsit
      if (!user) {
        return res.status(400).send({
          error: 'The account is not found.'
        })
      }
  
      // Update the user's password
      const newUser = await user.update({
        password: password,
        phonenumber: regexPhonenumber
      })
      res.send(newUser)
    } catch (err) {
      res.status(500).send({
        error: 'Failed to change your info'
      })
    }
  },
  async delete (req, res) {
    try {
      const adminName = req.user.name
      const selecteUserName = req.params.name

      // Check if the user is authroized from jwt token
      const isAuthorized = (await User.findByPk(adminName)).isAdmin

      if (!isAuthorized) {
        return res.status(401).send({
          error: 'You are not authorized.'
        })
      }

      // Get the user and delete
      const user = await User.findByPk(selecteUserName)
      await user.destroy()
      res.send(selecteUserName)

    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'Failed to delete the user.'
      })
    }
  },
  async getAllUsers(req, res) {
    try {
      // verify the admin
      const adminName = req.user.name

      // Check if the user is authroized from jwt token
      const isAuthorized = (await User.findByPk(adminName)).isAdmin

      if (!isAuthorized) {
        return res.status(401).send({
          error: 'You are not authorized.'
        })
      }

      // Get all users
      const users = await User.findAll({})

      res.send(users)

    } catch (err) {
      return res.status(400).send({
        error: 'No user exists.'
      })
    }
  },
  async isTokenValid (req, res) {
    const userId = req.user.id

    try {
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(400).send({
          error: 'The token is invalid.'
        })
      }
      res.send(true)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to find the user.'
      })
    }
  }
}

