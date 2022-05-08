const axios = require("axios")
const {Tipo} = require("../db")
const URL="https://pokeapi.co/api/v2/type"

const getIdFromUrl = (tipo)=>parseInt(tipo.url.split('/')[tipo.url.split('/').length-2])

async function getTypeToDb (){
    let resulType
    try{
        resulType = (await axios.get(`${URL}`)).data.results
    }catch(error){
        console.log(`ERROR EN RECEPCION DE DATOS`)
    }
    resulType.forEach(e => {
        Tipo.create({id:getIdFromUrl(e),nombre:e.name})
        .catch(error=> console.log(error))
    });
    
}

async function getType (req, res){
    let resulType
    try{
        resulType = (await axios.get(`${URL}`)).data.results
    }catch(error){
        res.status(501).send(`ERROR EN RECEPCION DE DATOS`)
    }
    res.json(resulType.map(type=>{return {name:type.name,id:getIdFromUrl(type)}}))
}

module.exports= {
    getType,
    getTypeToDb
}