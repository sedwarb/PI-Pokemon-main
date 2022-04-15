//import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_BYID = "GET_POKEMON_BYID"
export const GET_POKEMON_BYNAME = "GET_POKEMON_BYNAME"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const GET_TYPES = "GET_TYPES"

const ip = "192.168.20.27"
//const local = "localhost"

export function getPokemons(){
    return async function(dispatch){        
            return fetch(`http://${ip}:3001/pokemons`)
            .then(r=>r.json())
            .then(res=>dispatch({type:GET_POKEMONS,payload:res}))
            .catch(error=>console.log(`Error en getpokemons: ${error}`))  
    }
}



