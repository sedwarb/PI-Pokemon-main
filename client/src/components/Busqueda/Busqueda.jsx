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
    <div key={`lista${pagina}`} className='columna'>
      <div key='boton' className='boton'>
        <input key='db0' type="button" onClick={()=>setPagina(0)} value="|<<"/>
        <input key='sb' type="button" onClick={paginaant} value="|<"/>
        <input key='Ab' type="button" onClick={oAsc} value="Asce."/>
        <input key='db' type="button" onClick={oDec} value="Decr."/>
        <input key='ab' type="button" onClick={paginasig} value=">|"/>
        <input key='Ub' type="button" onClick={ultimo} value=">>|"/>
        <input key='Re' type="button" onClick={resetear} value="Reset."/>
        <span key="spanBoton" className='spanBoton'>Orden</span>
        <select key="listaOrden" name="listaOrden" id="listaOrden" onChange={(e)=>setStateGen({...stateGen,ordenT:e.currentTarget.value})}>
          <option key="opt0" value="0">nombre</option>
          <option key="opt1" value="1">fuerza</option>
          <option key="opt2" value="2">ambos</option>
        </select>
      </div>      
      <div key="divBT" className='divBT'>
        <span key="tiSpan" className='tiSpan'>Por Tipo</span>
        <input key="buttonOB" type="button" onClick={()=>dispatch(orderByType(pokemons,pokeName.tipos))} value="Filtrar" />
        <select key="seleOB" name="tipos" id="tipos" onClick={(e)=>setPokeName({...pokeName,tipos: e.target.value})}>
          {tipos.map((tipo,i)=>{
            return <option key={`plista${i}`} value={tipo.name} id={tipo.id} >{tipo.name}</option>
          })}
        </select>
      </div>
      <div key="divPPN" className="divPPN">
        <PokemonPorNombre />
      </div>
      <div key={`uno${pokemons.lenght}`} className='firstR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+0 && i<=pagina+3){
              if(pokemonDetail.nombre){
                return <PokemonCard pokemon={p} indice={i} detalle={"ap"}/>
              }else{
                return <PokemonCard pokemon={p} indice={i} detalle={"na"}/>
              }              
            }else return <div></div>
          })
        }
      </div>
      <div key={`dos${pokemons.lenght}`} className='secondR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+4 && i<=pagina+7){
              return <PokemonCard pokemon={p} indice={i} detalle={"na"}/>              
            }else return <div></div>
          })
        }
      </div>
      <div key={`tres${pokemons.lenght}`} className='thirdR'>
        {
          orden && orden.map((p,i)=>{
            if(i>=pagina+8 && i<=pagina+11){
              return <PokemonCard pokemon={p} indice={i} detalle={"na"}/>
            }else return <div></div>
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