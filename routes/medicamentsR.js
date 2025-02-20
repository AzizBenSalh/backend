const express = require('express');
const router = express.Router();
const { getAllMedications, addMedication } = require('../controllers/medicamentsControlleur');

// Route pour récupérer tous les médicaments
router.get('/medications', getAllMedications);

// Route pour ajouter un nouveau médicament
router.post('/medications', addMedication);

module.exports = router;
