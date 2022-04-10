const { Router } = require('express');
const {getPokemons,getPokemonsById,createPokemon} = require('../Controllers/CPokemons')

const router = Router();

router.get('/:idPokemon',getPokemonsById)
router.get('/',getPokemons)
router.post('/',createPokemon)

module.exports = router