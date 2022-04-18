import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getPokemons,orderA,orderD,orderAsc,orderDes} from '../../actions/actions'
import './Busqueda.css'

export function Busqueda() {
  const [pagina, setPagina] = useState(0);
  const dispatch = useDispatch()
  const pokemons = useSelector(state=>state.pokemonsLoaded)
  const asc = useSelector(state=>state.oAsc)
  const des = useSelector(state=>state.oDes)
  const orden = useSelector(state=>state.orden)
  /*
  useEffect(()=>{
    dispatch(getPokemons())    
  },[])//se ejecuta una sola vez
  */
  function oAsc(){    
    if(asc===false){
      dispatch(orderA(pokemons))
      dispatch(orderAsc(true))
      dispatch(orderDes(false))
    }
  }

  function oDec(){
    if(des===false){
      dispatch(orderD(pokemons))
      dispatch(orderDes(true))
      dispatch(orderAsc(false))
    }
  }

  function paginasig(){
    if(pagina<36)setPagina(pagina+12)
  }
  function paginaant(){
    if(pagina>=12)setPagina(pagina-12)
  }
  //<div key={`pokef${i}`}>{p.estadisticas.fuerza}</div>
  //<div key={`2pokef${i}`}>{p.estadisticas.fuerza}</div>
  //<div key={`3pokef${i}`}>{p.estadisticas.fuerza}</div>

  return (
    <div key={`lista${pagina}`} className='columna'>
      <div key='boton' className='boton'>
        <form onSubmit={(e) => {
          e.preventDefault();
          paginasig();
        }}>
          <input key='sb' type="submit" value={`Pag Sig: ${pagina}`} />
        </form>
        <form onSubmit={(e) => {
          e.preventDefault();
          paginaant();
        }}>
          <input key='ab' type="submit" value={`Pag Ant...`} />          
        </form>
        <input key='db' type="button" onClick={oDec} value="Decr."/>
        <input key='Ab' type="button" onClick={oAsc} value="Asce."/>
      </div>
      <div key={`uno${pokemons.lenght}`} className='firstR'>
        {
          orden && orden.map((p,i)=>{
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
          orden && orden.map((p,i)=>{
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
          orden && orden.map((p,i)=>{
            if(i>=pagina+8 && i<=pagina+11){
              return (
                <div key={`3poke${i}`}>
                  <img className='ipoke' src={p.imagen} alt='Pokemon' key={`2imgpoke${i}`}/>
                  <div key={`3pokeh1${i}`}>{p.nombre}</div>
                  <div key={`3poke2${i}`}>{p.tipos.map((t,j)=><div key={`2pokeh2${i}${j}`}>{t}</div>)}</div>
                  
                </div>
              )
            }        
          })
        }
      </div>
    </div>
  )
}