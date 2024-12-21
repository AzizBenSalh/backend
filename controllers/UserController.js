const bcrypt = require('bcrypt');
const User = require('../models/User');

// Contrôleur Sign-Up
const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }

        // Vérification de l'existence de l'email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = new User({
            name,
            email,
            password: hashedPassword, // Utiliser le mot de passe haché
            phone
        });

        // Sauvegarde dans la base de données
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès." });
    } catch (error) {
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
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur du serveur.", error: err.message });
    }
};

// Exportation des contrôleurs
module.exports = { signUp, login };