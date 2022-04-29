import React from "react";
import { Link } from 'react-router-dom';

export default function PokemonCard({pokemon,indice,detalle}) {
    if(detalle==="na"){
        return <div key={`pokeC${pokemon.nombre}`}>
        {
            <div key={`poke${pokemon.nombre}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`imgpoke${pokemon.nombre}`}/>
                <div key={`pokeh1${pokemon.nombre}`}>{pokemon.nombre}</div>                  
                <div key={`poke2${pokemon.nombre}`}>{pokemon.tipos.map((t,j)=><div key={`pokeh2${pokemon.nombre}${j}`}>{t}</div>)}</div>                  
            </div>
        }
        </div>
    }else{
        return <div key={`pokeCb${pokemon.nombre}`}>
        {
            <div key={`pokeb${pokemon.nombre}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`imgpokeb${pokemon.nombre}`}/>
                <div key={`pokeh1b${pokemon.nombre}`}><Link key={`linkb${indice}`} to="/pokemons/detail" >{pokemon.nombre}</Link></div>                  
                <div key={`poke2b${pokemon.nombre}`}>{pokemon.tipos.map((t,j)=><div key={`pokeh2b${pokemon.nombre}${j}`}>{t}</div>)}</div>                  
            </div>
        }
        </div>
    }
    
}