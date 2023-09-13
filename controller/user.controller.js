const mongoose = require('mongoose');
const { User } = require('../model/user.model.js');
const bcrypt   = require('bcrypt');
const SALT_ROUNDS = 10;

// GET /user
exports.list = async (req, res) => {
  try {
    const users_list = await User.find({}).exec();
    if (!users_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain users'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'Users obtained',
      users: users_list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// GET /user/:id
exports.listById = async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const found_user = await User.findOne(query).exec();
    if(!found_user) {
      return res.status(500).json({
        success: false,
        message: 'User does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User obtained',
      user: found_user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// POST /user
// Assumes that all the necessary user data is in the payload
// {
//   username
//   password
//   name
// }
exports.create = async (req, res) => {
  const create_data = req.body;
  try {
    const user_passhash = await bcrypt.hash(create_data.password, SALT_ROUNDS);
    create_data.password = user_passhash;
    create_data.isAdmin  = false;

    // INSERT
    const new_user = new User(create_data);
    new_user.save();

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      user: new_user
    });
  } catch (error) {
    console.log('Critical error: '+error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// PATCH /user/:id
exports.update = async(req, res) => {
  const update_data = req.body;
  const query = { _id: req.params.id };

  try {
    if(update_data.has('password')){
      const passhash = await bcrypt.hash(create_data.password, SALT_ROUNDS);
      update_data.set('password', passhash);
    }
    const updated_user = await User.findOneAndUpdate(query, update_data, { new: true }).exec();
    if (!updated_user) {
      return res.status(500).json({
        success: false,
        message: "Could not update user"
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updated_user
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error
    });
  }
}

// DELETE /user/:id
exports.delete = async (req, res) => {
  const query = { _id: req.params.id };

  try {
    const deleted_user = await User.findOneAndDelete(query).exec();
    if(!deleted_user) {
      return res.status(500).json({
        success: false,
        message: "Could not delete user"
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deleted_user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}
