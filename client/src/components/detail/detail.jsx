import React from 'react'
import { useSelector } from 'react-redux'

export function Detail(){
    const pokeDetail = useSelector(state=>state.pokemonDetail)
    if(pokeDetail.nombre){
        return (
            <div>
                <img key="img" src={pokeDetail.imagen} alt='PokeDetail'/>
                <div key="nombre">{`Nombre: ${pokeDetail.nombre}`}</div>
                <div key="tipoeti">{`Tipo: `}</div>
                <div key="tipomap">{pokeDetail.tipos && pokeDetail.tipos.map(p=><div>{p}</div>)}</div>
                <div key="id">{`ID: ${pokeDetail.id}`}</div>
                <div key="estadis" >{`Estadisticas: `}</div>
                <div key="vida" >{`Vida: ${pokeDetail.estadisticas.vida}`}</div>
                <div key="fuerza" >{`Fuerza: ${pokeDetail.estadisticas.fuerza}`}</div>
                <div key="defenza" >{`Defenza: ${pokeDetail.estadisticas.defenza}`}</div>
                <div key="velocidad" >{`Velocidad: ${pokeDetail.estadisticas.velocidad}`}</div>
                <div key="altura" >{`Altura: ${pokeDetail.altura}`}</div>
                <div key="peso" >{`Peso: ${pokeDetail.peso}`}</div>
            </div>
        )
    }else{
        return <div>Registro Vacio</div>
    }
    
}