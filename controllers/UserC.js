const bcrypt = require('bcrypt');
const User = require('../models/User');

// Contrôleur Sign-Up
const signUp = async (req, res) => {
    try {
        console.log("Requête reçue pour Sign-Up : ", req.body);

        // Récupération des champs depuis le body, incluant "role"
        const { name, email, password, role } = req.body;

        // Vérifie si un utilisateur existe déjà avec cet email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur avec le champ role
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role  // "role" peut être "user" ou "pharmacy_owner"
        });
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès." });
    } catch (error) {
        console.error("Erreur dans le contrôleur Sign-Up : ", error);
        res.status(500).json({ message: "Erreur du serveur.", error: error.message });
    }
};





// Contrôleur Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }

        // Répondre avec les informations utilisateur
        res.status(200).json({
            message: "Connexion réussie.",
            user: { id: user._id, name: user.name, email: user.email}
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur du serveur.", error: err.message });
    }
};

// Exportation des contrôleurs
module.exports = { signUp, login };
