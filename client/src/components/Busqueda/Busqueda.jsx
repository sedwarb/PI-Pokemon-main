import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getPokemons} from '../../actions/actions'
import './Busqueda.css'

export function Busqueda() {
  const [pagina, setPagina] = useState(0);
  const dispatch = useDispatch()
  const pokemons = useSelector(state=>state.pokemonsLoaded)
  
  useEffect(()=>{
    dispatch(getPokemons(pagina))
  },[pagina])//se va a actualizar cada vez que haya un cambio
  function paginasig(){
    if(pagina<36)setPagina(pagina+12)
  }
  function paginaant(){
    if(pagina>=12)setPagina(pagina-12)
  }
  return (
    <div key={`lista${pagina}`} className='columna'>
      <div key='boton' className='boton'>
        <form onSubmit={(e) => {
          e.preventDefault();
          paginasig();
        }}>
          <input type="submit" value={`Pag Sig: ${pagina}`} />
        </form>
        <form onSubmit={(e) => {
          e.preventDefault();
          paginaant();
        }}>
          <input type="submit" value={`Pag Ant...`} />
        </form>
      </div>
      <div key={`uno${pokemons.lenght}`} className='firstR'>
        {
          pokemons.map((p,i)=>{
            if(i>=pagina+0 && i<=pagina+3){
              return (
                <div key={`poke${i}`}>
                  <img className='ipoke' src={p.imagen} alt='Pokemon' key={`imgpoke${i}`}/>
                  <div key={`pokeh1${i}`}>{p.nombre}</div>
                  <div key={`poke2${i}`}>{p.tipos.map((t,j)=><div key={`pokeh2${i}${j}`}>{t}</div>)}</div>
                </div>
              )
            }        
          })
        }
      </div>
      <div key={`dos${pokemons.lenght}`} className='secondR'>
        {
          pokemons.map((p,i)=>{
            if(i>=pagina+4 && i<=pagina+7){
              return (
                <div key={`2poke${i}`}>
                  <img className='ipoke' src={p.imagen} alt='Pokemon' key={`2imgpoke${i}`}/>
                  <div key={`2pokeh1${i}`}>{p.nombre}</div>
                  <div key={`2poke2${i}`}>{p.tipos.map((t,j)=><div key={`2pokeh2${i}${j}`}>{t}</div>)}</div>
                </div>
              )
            }        
          })
        }
      </div>
      <div key={`tres${pokemons.lenght}`} className='thirdR'>
        {
          pokemons.map((p,i)=>{
            if(i>=pagina+8 && i<=pagina+11){
              return (
                <div key={`2poke${i}`}>
                  <img className='ipoke' src={p.imagen} alt='Pokemon' key={`2imgpoke${i}`}/>
                  <div key={`2pokeh1${i}`}>{p.nombre}</div>
                  <div key={`2poke2${i}`}>{p.tipos.map((t,j)=><div key={`2pokeh2${i}${j}`}>{t}</div>)}</div>
                </div>
              )
            }        
          })
        }
      </div>
    </div>
  )
}