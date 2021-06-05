const User = require('../users/users-model')
const Post = require('../posts/posts-model')

class Validade {
  validateUserId = async (req, res, next) => {
    const {id} = req.params

    try {
      const data = await User.getById(id)

      if (!data) {
        next({status: 404, message: 'user not found'})
      } else {
        req.user = data
        next()
      }
    } catch (error) {
      next({status: 500, message: 'App has crashed!!!'})
    }
  }

  validatePost = (req, res, next) => {
    const {text} = req.body
    if (!text) {
      next({status: 400, message: 'missing required text field'})
    }

    req.post = text
    next()
  }

  validateUser = (req, res, next) => {
    const {name} = req.body

    if (!name || typeof 'name' !== 'string') {
      next({status: 400, message: 'missing required name field'})
    } else {
      req.name = {name}
      next()
    }
  }

  logger = () => {}
}

module.exports = new Validade()
