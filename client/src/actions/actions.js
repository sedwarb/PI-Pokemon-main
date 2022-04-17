//import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_BYID = "GET_POKEMON_BYID"
export const GET_POKEMON_BYNAME = "GET_POKEMON_BYNAME"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const GET_ORDER = "GET_ORDER"
export const CHANGE_ORDER = "CHANGE_ORDER"

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

export function getPokemonByName(nombre){
    return async function(dispatch){        
        return fetch(`http://${ip}:3001/pokemons?name=${nombre}`)
        .then(r=>r.json())
        .then(res=>dispatch({type:GET_POKEMON_BYNAME,payload:res}))
        .catch(error=>console.log(`Error en getPokemonByName: ${error}`))  
    }
}

export function getPokeOrder(){
    return async function(dispatch){        
            return fetch(`http://${ip}:3001/pokemons`)
            .then(r=>r.json())
            .then(res=>dispatch({type:GET_POKEMONS,payload:res.sort(
                (a,b)=>{
                  if(a.nombre>b.nombre)return 1
                  if(a.nombre<b.nombre)return -1
                  return 0
                }
              )}))
            .catch(error=>console.log(`Error en getPokeOrder: ${error}`))  
    }
}