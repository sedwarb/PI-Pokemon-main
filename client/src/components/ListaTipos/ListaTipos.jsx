import React,{useState,useEffect} from 'react';
import {tiposList,sTpos} from '../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import './ListaTipos.css'

export default function ListTypes ({lTipos}) {
    const [datos, setDatos] = useState({acum:true});
    const sTipo = useSelector(state=>state.sTipo)
    const dispatch = useDispatch()
    function ftipo(e){        
        if(datos.acum){
            setDatos({acum: false})
        }else{
          setDatos({acum: true})
          let existe=false
          if(sTipo.length>0){
            if(sTipo.find(p=>p.tipos===e.target.value)){
              existe=true
            }            
          }
          if(existe===false && sTipo.length<4){
            dispatch(sTpos([...sTipo,{[e.target.id]:e.target.value}]))
          }
        }        
    }
    useEffect(()=>{
        dispatch(tiposList(sTipo));
    },[sTipo])    
    return (
      <div key={`111`} className='tipoLista'>
        <div key={`112`} className='divtitle'>Tipo</div>
        <select className='divlista' name="tipos" id="tipos" key={`113`} onClick={(e)=>ftipo(e)}>
            {lTipos.map((tipo,i)=>{
                return <option key={`map114${i}`} value={`${tipo.id}:${tipo.name}`} id={tipo.id} >{tipo.name}</option>
            })}
        </select><input className='divlistaButton' type="button" key={`115`} value="Limpiar" onClick={()=>dispatch(sTpos([]))} />
        <div className='inplista' key={`116`} id="divTipo" >{sTipo.map((p,i)=><div key={`map117${i}`}>{`${p.tipos.split(":")[1]}`}</div>)}        
        </div>
      </div>
    );
};