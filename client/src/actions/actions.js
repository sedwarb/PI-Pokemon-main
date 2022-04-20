export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_BYID = "GET_POKEMON_BYID"
export const GET_POKEMON_BYNAME = "GET_POKEMON_BYNAME"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const POKEMON_TYPES = "POKEMON_TYPES"
export const GET_ORDER = "GET_ORDER"
export const CHANGE_ASC = "CHANGE_ASC"
export const CHANGE_DES = "CHANGE_DES"
export const ORDER_ASC = "ORDER_ASC"
export const ORDER_DES = "ORDER_DES"
export const FILTRO = "FILTRO"

const ip = "192.168.20.27"
//const local = "localhost"

export function getPokemons(){
    return async function(dispatch){        
            return fetch(`http://${ip}:3001/pokemons`)
            .then(r=>r.json())
            .then(res=>dispatch({type:GET_POKEMONS,payload:res}))
            .then(res=>dispatch({type:ORDER_ASC,payload:res.payload}))
            .catch(error=>console.log(`Error en getpokemons: ${error}`))  
    }
}
export function createPokemons(pokemon){
    const options = {method: "POST",headers:{"Content-Type": "application/json"},
        body: JSON.stringify(pokemon)};
    return async function(dispatch){
        return fetch(`http://${ip}:3001/pokemons`,options)
            .then(response => response.json())
            .then(data =>dispatch({type:CREATE_POKEMON,payload:data}))
            .catch(error =>console.log(error))
    }
}
export function getPokemonByName(nombre,pokemons){
    let pokemon = pokemons.filter(p=>p.nombre===nombre)
    return function(dispatch){        
        dispatch({type:GET_POKEMON_BYNAME,payload:pokemon[0]})
    }
}
export function orderAsc(asc){ 
    return function(dispatch){
        dispatch({type:CHANGE_ASC,payload:asc})        
    }
}
export function orderDes(des){
    return function(dispatch){
        dispatch({type:CHANGE_DES,payload:des})
    }
}
export function orderA(orden){
    if(orden.length>0){
        return function(dispatch){
            dispatch({type:ORDER_ASC,payload:orden.slice().sort(
                (a,b)=>{
                    if(a.estadisticas.fuerza > b.estadisticas.fuerza)return 1
                    if(a.estadisticas.fuerza < b.estadisticas.fuerza)return -1
                    return 0
                }
            ).sort((a,b)=>{
                    if(a.nombre>b.nombre)return 1
                    if(a.nombre<b.nombre)return -1
                return 0
            })
            })
        }
    }
}
export function orderD(orden){
    if(orden.length>0){
        return function(dispatch){
            dispatch({type:ORDER_DES,payload:orden.slice().sort(
                (a,b)=>{
                    if(a.estadisticas.fuerza > b.estadisticas.fuerza)return -1
                    if(a.estadisticas.fuerza < b.estadisticas.fuerza)return 1
                    return 0
                }
                ).sort((a,b)=>{
                    if(a.nombre>b.nombre)return -1
                    if(a.nombre<b.nombre)return 1
                    return 0
                })
            })
        }
    }
}
export function orderByType(pokemons,tipoA){
    let pokemonsF = []
    pokemons.forEach((pokemon) => {
        if(pokemon.tipos.find(tipoP=>tipoP===tipoA)){
            pokemonsF.push(pokemon) 
        }
    });    
    return function(dispatch){
        dispatch({type:GET_TYPES,payload:pokemonsF})
    }    
}
export function reset(pokemons){
    return function(dispatch){
        dispatch({type:ORDER_ASC,payload:pokemons})
    } 
}
export function tiposPokemon(){
    return async function(dispatch){        
        return fetch(`http://${ip}:3001/types`)
        .then(r=>r.json())
        .then(res=>dispatch({type:POKEMON_TYPES,payload:res}))
        .catch(error=>console.log(`Error en tiposPokemon: ${error}`))  
}
}