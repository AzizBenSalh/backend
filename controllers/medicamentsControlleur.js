// controllers/medicationController.js
const Medicament = require('../models/medicaments');

// Contrôleur pour récupérer tous les médicaments
const getAllMedications = async (req, res) => {
  try {
    // Récupère tous les médicaments depuis la base de données
    const medications = await Medicament.find();
    res.status(200).json({ medications });
  } catch (error) {
    console.error('Erreur lors de la récupération des médicaments :', error);
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};

// Contrôleur pour ajouter un nouveau médicament
const addMedication = async (req, res) => {
  try {
    // On récupère les données du médicament depuis le body de la requête
    const medicationData = req.body;

    // Si lastUpdated n'est pas fourni, on le définit sur la date du jour (format YYYY-MM-DD)
    if (!medicationData.lastUpdated) {
      medicationData.lastUpdated = new Date().toISOString().split('T')[0];
    }

    // Création d'une nouvelle instance du modèle Medicament
    const medication = new Medicament(medicationData);
    
    // Sauvegarde du médicament dans la base de données
    await medication.save();
    
    res.status(201).json({ message: 'Médicament ajouté avec succès', medication });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du médicament :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du médicament', error: error.message });
  }
};

module.exports = { getAllMedications, addMedication };
