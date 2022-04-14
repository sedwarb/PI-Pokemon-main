import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getPokemons} from '../../actions/actions'
import './Busqueda.css'

export function Busqueda() {
  const dispatch = useDispatch()
  const pokemons = useSelector(state=>state.pokemonsLoaded)
  useEffect(()=>{
    dispatch(getPokemons())
  },[])//se va a actualizar cada vez que haya un cambio
  return (
    <div key={pokemons.lenght} className='unPoquemon'>
      {pokemons.map((p,i)=>{
        return (
          <div key={i}>
            <img src={p.imagen} alt='Pokemon' />
            <div>{p.nombre}</div>
            <div>{p.tipos.map(t=><div>{t}</div>)}</div>
          </div>
        )
      })}
    </div>
  )
}