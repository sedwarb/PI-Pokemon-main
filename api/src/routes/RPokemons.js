const { Router } = require('express');
const {getPokemons,getPokemonsById,createPokemon,updatePokemon,deletePokemon} = require('../Controllers/CPokemons')

const router = Router();

router.get('/:idPokemon',getPokemonsById)
router.get('/',getPokemons)
router.post('/',createPokemon)
router.put('/',updatePokemon)
router.delete('/',deletePokemon)

module.exports = router