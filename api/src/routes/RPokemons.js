const { Router } = require('express');
const {getPokemons,getPokemonsById} = require('../Controllers/CPokemons')

const router = Router();

router.get('/:idPokemon',getPokemonsById)
router.get('/',getPokemons)

module.exports = router