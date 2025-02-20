// models/Medicament.js
const mongoose = require('mongoose');

const MedicamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // On stocke la date de mise à jour sous forme de chaîne (ex. "2024-03-15")
  lastUpdated: {
    type: String,
    required: true
  }
});

// Crée une propriété virtuelle "id" qui renvoie _id sous forme de chaîne
MedicamentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Assurez-vous que les champs virtuels sont inclus dans le JSON
MedicamentSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Medicament', MedicamentSchema);
