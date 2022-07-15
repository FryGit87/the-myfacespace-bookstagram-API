const router = require('express').Router()

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller')

// /api/users
router.route('/').get(getUsers).post(createUser)

// /api/users/:id
router.route('/:id').get(getSingleUser)

//User's friend Add / Delete
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

//User Update / Delete
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser)

module.exports = router
