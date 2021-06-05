const express = require('express')
const User = require('./users-model')
const Post = require('../posts/posts-model')
const {
  validateUser,
  validateUserId,
  validatePost,
} = require('../middleware/middleware')
const {text} = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await User.get()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

router.post('/', validateUser, async (req, res, next) => {
  try {
    const data = await User.insert(req.name)
    console.log('test')
    res.status(201).json(data)
  } catch (error) {
    next({status: 500, message: 'User could not be saved.'})
  }
})

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  let {id} = req.params
  id = Number(id)
  try {
    await User.update(Number(id), req.name)

    res.status(200).json({id, ...req.name})
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validateUserId, async (req, res, next) => {
  const {id} = req.params
  try {
    await User.remove(id)
    res.status(200).json(req.user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  const {id} = req.params
  try {
    const data = await User.getUserPosts(id)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/:id/posts',
  validateUserId,
  validatePost,
  async (req, res, next) => {
    try {
      const data = await Post.insert({
        user_id: req.params.id,
        text: req.post,
      })

      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
)

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router
