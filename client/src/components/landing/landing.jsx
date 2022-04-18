import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {getPokemons} from '../../actions/actions'

export default function Landing() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPokemons())    
      },[])//se ejecuta una sola vez
    return (
        <div className="landing" > 
            <img  src="https://fontmeme.com/images/Pokemon-Logo.jpg" alt='Pokemon' />
            <h3><NavLink exact to="/pokemons" >Inicio</NavLink></h3>            
        </div>
    )
}