const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'pharmacy_owner'], // Limite les valeurs possibles
    default: 'user' // Par défaut, le rôle est "user"
  }
});

module.exports = mongoose.model('User', userSchema);
