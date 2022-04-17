import {CHANGE_ORDER,GET_POKEMONS,GET_POKEMON_BYID,GET_POKEMON_BYNAME,CREATE_POKEMON,GET_TYPES} from '../actions/actions'

const initialState = {
    pokemonTypes: [],
    pokemonsLoaded: [],
    pokemonDetail: {},
    orden:false
  };

  function rootReducer(state = initialState, action) {
    if (action.type === GET_POKEMONS) {
        return {
          ...state,
          pokemonsLoaded: action.payload
        };
    }
    if (action.type === GET_POKEMON_BYNAME) {
      return {          
        ...state,
          pokemonDetail: action.payload
        };
    }
    if (action.type === CHANGE_ORDER) {
      return {          
        ...state,
        orden: action.payload
        };
    }

    if (action.type === GET_POKEMON_BYID) {
        return {
            ...state,
            pokemonDetail: action.payload
          };
    }    
    if (action.type === CREATE_POKEMON) {
      return {
        ...state,
        pokemonsLoaded: action.payload
      };
  }
    if (action.type === GET_TYPES) {
      return {
        ...state,
        pokemonTypes: action.payload
      };
    }
    return state;
  }
  export default rootReducer;