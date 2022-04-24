import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {reset,orderA,orderD,orderAsc,orderDes,orderByType} from '../../actions/actions'
import PokemonPorNombre from '../../components/PokemonPorNombre/PokemonPorNombre'
import './Busqueda.css'

export function Busqueda() {
  const [pagina, setPagina] = useState(0);
  const [pokeName, setPokeName] = useState({});
  const [stateGen,setStateGen]=useState({ordenT:0})
  const dispatch = useDispatch()
  const pokemons = useSelector(state=>state.pokemonsLoaded)
  const asc = useSelector(state=>state.oAsc)
  const des = useSelector(state=>state.oDes)
  const orden = useSelector(state=>state.orden)
  const tipos = useSelector(state=>state.pokemonTypes)
  
  function oAsc(){    
    if(asc===false){
      dispatch(orderA(orden,stateGen.ordenT))
      dispatch(orderAsc(true))
      dispatch(orderDes(false))
    }
  }
  function oDec(){
    if(des===false){
      dispatch(orderD(orden,stateGen.ordenT))
      dispatch(orderDes(true))
      dispatch(orderAsc(false))
    }
  }
  function ultimo(){
    if(orden.length/12<=1)setPagina(0)
    if(orden.length/12>1 && orden.length/12<=2)setPagina(12)
    if(orden.length/12>2 && orden.length/12<=3)setPagina(24)
    if(orden.length/12>3 && orden.length/12<=4)setPagina(36)
  }
  function paginasig(){
    if(pagina<36 && orden.length>12)setPagina(pagina+12)
  }
  function paginaant(){
    if(pagina>=12)setPagina(pagina-12)
  }
  return (
    <div key={`lista${pagina}`} className='columna'>
      <div key='boton' className='boton'>
        <input key='db0' type="button" onClick={()=>setPagina(0)} value="|<<"/>
        <input key='sb' type="button" onClick={()=>paginaant()} value="|<"/>
        <input key='db' type="button" onClick={oDec} value="Decr."/>        
        <input key='Ab' type="button" onClick={oAsc} value="Asce."/>
        <input key='ab' type="button" onClick={()=>paginasig()} value=">|"/>
        <input key='Ub' type="button" onClick={ultimo} value=">>|"/>
        <input key='Re' type="button" onClick={()=>dispatch(reset(pokemons))} value="Reset."/>
        <select key="listaOrden" name="listaOrden" id="listaOrden" onChange={(e)=>setStateGen({ordenT:e.currentTarget.value})}>
          <option value="0">Nombre</option>
          <option value="1">Fuerza</option>
          <option value="2">Ambos</option>
        </select>
      </div>
      <div>
        <span className='tiSpan'>Por Tipo...</span>
        <input type="button" onClick={()=>dispatch(orderByType(pokemons,pokeName.tipos))} value="Filtrar" />
        <select name="tipos" id="tipos" onClick={(e)=>setPokeName({tipos: e.target.value})}>
          {tipos.map((tipo,i)=>{
            return <option key={`plista${i}`} value={tipo.name} id={tipo} >{tipo.name}</option>
          })}
        </select>
      </div>
      <div>
        <PokemonPorNombre />
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