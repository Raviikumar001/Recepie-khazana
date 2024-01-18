const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('../models/user');


const recipeSchema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: User, // Assuming you have a 'User' model
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  ingredients: {
    type: String,
    required: false,
    unique: false,
  },
  totalTime: {
    type: String,
    required: false,
    unique: false,
  },
  images: [{
    type: String,
    required: false,
  }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
