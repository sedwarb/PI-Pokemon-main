import React from 'react'
import { useSelector } from 'react-redux'

export function Detail(){
    const pokeDetail = useSelector(state=>state.pokemonDetail)
    if(pokeDetail.nombre){
        return (
            <div>
                <img src={pokeDetail.imagen} alt='PokeDetail'/>
                <div>{`Nombre: ${pokeDetail.nombre}`}</div>
                <div>{`Tipo: `}</div>
                <div>{pokeDetail.tipos && pokeDetail.tipos.map(p=><div>{p}</div>)}</div>
                <div>{`ID: ${pokeDetail.id}`}</div>
                <div>{`Estadisticas: `}</div>
                <div>{`Vida: ${pokeDetail.estadisticas.vida}`}</div>
                <div>{`Fuerza: ${pokeDetail.estadisticas.fuerza}`}</div>
                <div>{`Defenza: ${pokeDetail.estadisticas.defenza}`}</div>
                <div>{`Velocidad: ${pokeDetail.estadisticas.velocidad}`}</div>
                <div>{`Altura: ${pokeDetail.altura}`}</div>
                <div>{`Peso: ${pokeDetail.peso}`}</div>
            </div>
        )
    }else{
        return <div>Registro Vacio</div>
    }
    
}