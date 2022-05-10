import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import PokemonCard from '../PokemonCard/PokemonCard'
import {reset,orderA,orderD,orderAsc,orderDes,orderByType} from '../../actions/actions'
import PokemonPorNombre from '../../components/PokemonPorNombre/PokemonPorNombre'
import './Busqueda.css'

export function Busqueda() {
  const [pagina, setPagina] = useState(0);
  const [pokeName, setPokeName] = useState({tipos:"normal"});
  const [stateGen,setStateGen]=useState({ordenT:0})
  const dispatch = useDispatch()
  const {oAsc:asc,oDes:des,orden,pokemonTypes:tipos,pokemonsLoaded:pokemons,pokemonDetail} = useSelector(state=>state)  
  
  return (
    <div key={`12${pagina}`} className='columna'>
      <div key='13' className='boton'>
        <input key='14' type="button" onClick={()=>setPagina(0)} value="|<<"/>
        <input key='15' type="button" onClick={paginaant} value="|<"/>
        <input key='16' type="button" onClick={oAsc} value="Asce."/>
        <input key='17' type="button" onClick={oDec} value="Decr."/>
        <input key='18' type="button" onClick={paginasig} value=">|"/>
        <input key='19' type="button" onClick={ultimo} value=">>|"/>
        <input key='20' type="button" onClick={resetear} value="Reset."/>
        <span key="21" className='spanBoton'>Orden</span>
        <select key="22" name="listaOrden" id="listaOrden" onChange={(e)=>setStateGen({...stateGen,ordenT:e.currentTarget.value})}>
          <option key="23" value="0">nombre</option>
          <option key="24" value="1">fuerza</option>
          <option key="25" value="2">ambos</option>
        </select>
      </div>      
      <div key="26" className='divBT'>
        <span key="27" className='tiSpan'>Por Tipo</span>
        <input key="28" type="button" onClick={()=>dispatch(orderByType(pokemons,pokeName.tipos))} value="Filtrar" />
        <select key="29" name="tipos" id="tipos" onClick={(e)=>setPokeName({...pokeName,tipos: e.target.value})}>
          {tipos.map((tipo,i)=>{
            return <option key={`map30${i}`} value={tipo.name} id={tipo.id} >{tipo.name}</option>
          })}
        </select>
      </div>
      <div key="31" className="divPPN">
        <PokemonPorNombre key={`po31p1`}/>
      </div>
      <div key={`32${pokemons.lenght}`} className='firstR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+0 && i<=pagina+3){
              if(pokemonDetail.nombre){
                return <PokemonCard key={`poca32p1${i}`} pokemon={p} indice={i} detalle={"ap"}/>
              }else{
                return <PokemonCard key={`poca32p2${i}`} pokemon={p} indice={i} detalle={"na"}/>
              }              
            }else return <div key={`32p3${i}`}></div>
          })
        }
      </div>
      <div key={`33${pokemons.lenght}`} className='secondR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+4 && i<=pagina+7){
              return <PokemonCard key={`poca33p1${i}`} pokemon={p} indice={i} detalle={"na"}/>              
            }else return <div key={`map34${i}`}></div>
          })
        }
      </div>
      <div key={`35${pokemons.lenght}`} className='thirdR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+8 && i<=pagina+11){
              return <PokemonCard key={`poca35p1${i}`} pokemon={p} indice={i} detalle={"na"}/>
            }else return <div key={`map36${i}`}></div>
          })
        }
      </div>
    </div>
  )
  function paginaant(){
    if(pagina>=12)setPagina(pagina-12)
  }
  function paginasig(){
    if(pagina<36 && orden.length>12)setPagina(pagina+12)
  }
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
    let divdoce=orden.length/12
    let pag = [0,12,24,36]
    pag.forEach((p,i)=>{if(divdoce>i&&divdoce<=i+1)setPagina(p)})
  }  
  function resetear(){
    let elem = [{t:'buscar',v:""},{t:'listaOrden',v:"0"},{t:'tipos',v:"normal"}]
    dispatch(reset(pokemons))    
    setPagina(0)
    elem.forEach(p=>document.getElementById(p.t).value=p.v)
  }
}