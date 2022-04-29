import React from "react";
import { Link } from 'react-router-dom';

export default function PokemonCard({pokemon,indice,detalle}) {
    if(detalle==="na"){
        return <div>
        {
            <div key={`poke${indice}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`imgpoke${indice}`}/>
                <div key={`pokeh1${indice}`}>{pokemon.nombre}</div>                  
                <div key={`poke2${indice}`}>{pokemon.tipos.map((t,j)=><div key={`pokeh2${indice}${j}`}>{t}</div>)}</div>                  
            </div>
        }
        </div>
    }else{
        return <div>
        {
            <div key={`poke${indice}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`imgpoke${indice}`}/>
                <div key={`pokeh1${indice}`}><Link to="/pokemons/detail" >{pokemon.nombre}</Link></div>                  
                <div key={`poke2${indice}`}>{pokemon.tipos.map((t,j)=><div key={`pokeh2${indice}${j}`}>{t}</div>)}</div>                  
            </div>
        }
        </div>
    }
    
}