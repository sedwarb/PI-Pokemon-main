const { Router } = require('express');
const pokemons = require("./RPokemons")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons',pokemons)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
