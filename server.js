const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
dotenv.config(); 

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // URL de votre frontend React
    methods: ['GET', 'POST'],
    credentials: true
  }));
const port = process.env.PORT || 5000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Express');
});


app.use('/api/users', userRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
