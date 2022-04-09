const { Router } = require('express');
const pokemons = require("./RPokemons")
const tipo = require("./RTipo")

const router = Router();
router.use('/pokemons',pokemons)
router.use('/type',tipo)

module.exports = router;
