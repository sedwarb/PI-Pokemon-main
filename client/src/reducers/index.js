import {ORDER_ASC,ORDER_DES,CHANGE_ASC,CHANGE_DES,GET_POKEMONS,GET_POKEMON_BYID,GET_POKEMON_BYNAME,CREATE_POKEMON,GET_TYPES} from '../actions/actions'

const initialState = {
    pokemonTypes: [],
    pokemonsLoaded: [],
    pokemonDetail: {},
    orden:[],
    oAsc:false,
    oDes:false
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
    if (action.type === CHANGE_ASC) {
      return {          
        ...state,
        oAsc:action.payload
        };
    }
    if (action.type === CHANGE_DES) {
      return {          
        ...state,
        oDes: action.payload
        };
    }
    if (action.type === ORDER_ASC) {
      return {          
        ...state,
        orden: action.payload
        };
    }    
    if (action.type === ORDER_DES) {
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