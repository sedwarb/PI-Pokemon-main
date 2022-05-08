const axios = require("axios")
const { Op } = require("sequelize")
const {Pokemon,poketipo,Tipo} = require("../db")
const URL="https://pokeapi.co/api/v2/pokemon"
const limite = '?limit=40&offset='

async function getPokemons (req, res){
    let resultPokemons

    if(!isNaN(req.query.name)) res.send("Debe colocarse un Nombre no un ID")

    if(req.query.name){
        let dbPokemon
        
        try{
            dbPokemon=(await Pokemon.findOne(
                {
                    where: {nombre: req.query.name},
                    attributes:['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
                    include: [
                        {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                    ]
                }
            ))

            if(dbPokemon)res.json(objDatosPokeDb(dbPokemon))

        }catch(error){
            try{resultPokemons = (await axios.get(`${URL}/${req.query.name}`)).data}
            catch{res.status(404).send(`No Existe El Pokemon: ${req.query.name}`)}
            res.json(objDatosPokeApi(resultPokemons))
        }

    }else{
        resultPokemons = (await axios.get(`${URL}${limite}`)).data.results
        .map(linkToPoke=>linkToPoke.url)
        let datosPoke = []

        for (let index = 0; index < resultPokemons.length; index++) {
            datosPoke.push((await axios.get(resultPokemons[index])).data)
        }

        let apiPokemon = datosPoke.map(p=>objDatosPokeApi(p))
        let dbPokemon

        try{
            dbPokemon=(await Pokemon.findAll({attributes: ['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
            where:{nombre:{[Op.ne]: "PokeDefault"}},
            include: [
                {model:Tipo,attributes:["nombre"],through:{attributes:[]}}
            ]}))
        }catch(error){
            console.log(`Hubo un Error de BD`)
            res.json(apiPokemon)
        }

        let NdbPokemon=[],Ntipo

        for (let i = 0; i < dbPokemon.length; i++) {
            Ntipo = dbPokemon[i].tipos.map(p=>p.nombre)
            NdbPokemon.push(
                {
                    nombre:dbPokemon[i].nombre,
                    imagen:dbPokemon[i].imagen,
                    tipos:Ntipo,
                    id:dbPokemon[i].id,
                    altura:dbPokemon[i].altura,
                    peso:dbPokemon[i].peso,
                    estadisticas:{
                        vida:dbPokemon[i].vida,
                        fuerza:dbPokemon[i].fuerza,
                        defenza:dbPokemon[i].defenza,
                        velocidad:dbPokemon[i].velocidad
                    }                    
                }
            )
        }
        res.json(NdbPokemon.concat(apiPokemon))        
    }
}

async function getPokemonsById (req, res){
    let resultPokemons
    let dbPokemon=null

    if(isNaN(req.params.idPokemon)===true) res.send("Error en el id ingresado")

    try{
        dbPokemon=(await Pokemon.findOne(
            {
                where: {id: parseFloat(req.params.idPokemon)},
                attributes:['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
                include: [
                    {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                ]
            }
        ))

        if(!dbPokemon)console.log("No esta en la base de datos")
        else res.json(objDatosPokeDb(dbPokemon))

    }catch{console.log('Error al encontrar id en la BD')}

    let i = req.params.idPokemon

    if(i>11000) res.json("Id del Pokemon No Existe")
    else {resultPokemons = (await axios.get(`${URL}/${req.params.idPokemon}/`)).data}

    res.json(objDatosPokeApi(resultPokemons))
}

function createPokemon(req, res){
    const {nombre, vida, fuerza, defenza, velocidad, altura, peso,tipo,imagen}= req.body
    Pokemon.create({id:Date.now(),nombre:nombre.toLowerCase(), vida, fuerza, defenza, velocidad, altura, peso, imagen})
    .then((response)=> {        
        tipo.forEach(e=>poketipo.create({pokemonId:response.id,tipoId:e}))
        res.send('Pokemon Creado Exitosamente')
    })
    .catch(error=> console.log(error))
}

function updatePokemon(req, res){
    let objUpdate = {}

    for (const property in req.body) {
        if(req.body[property])objUpdate[property]=req.body[property]
    }
    
    Pokemon.update(objUpdate,{where:{id:parseFloat(req.body.id)}})
    .then(()=>res.send('Pokemon Actualizado Exitosamente'))
    .catch(error=> console.log(`Error en Actualizacion: ${error}`))
}

function deletePokemon(req, res){
    Pokemon.destroy({where:{id:parseFloat(req.body.id)}})    
    .then(()=>res.send('Pokemon Eliminado Exitosamente'))
    .catch(error=> console.log(`Error en Eliminar Pokemon: ${error}`))
}

function primerPokemondb(){
    const imangen1 = "https://pm1.narvii.com/6305/84ffa2658769b31eb8c7dd5c71105a39ae3467a4_hq.jpg"
    Pokemon.create({id:Date.now(),nombre:"PokeDefault", imagen:imangen1})
}

function objDatosPokeApi(pokemon){
    let [vida,fuerza,defenza,velocidad] = pokemon.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
    .map((r)=>r.base_stat)
    return {
        imagen:pokemon.sprites.other.dream_world.front_default,
        nombre:pokemon.forms[0].name,
        tipos:pokemon.types.map(p=>p.type.name),
        id:pokemon.id,
        estadisticas:{vida,fuerza,defenza,velocidad},
        altura:pokemon.height,
        peso:pokemon.weight
    }
}

function objDatosPokeDb(pokemon){
    return {
        imagen:pokemon.imagen,
        nombre:pokemon.nombre,
        tipo:pokemon.tipos,
        id:pokemon.id,
        estadisticas:{
            vida:pokemon.vida,
            fuerza:pokemon.fuerza,
            defenza:pokemon.defenza,
            velocidad:pokemon.velocidad
        },
        altura: pokemon.height,
        peso: pokemon.weight
    }
}


module.exports= {
    getPokemons,
    getPokemonsById,
    createPokemon,
    updatePokemon,
    deletePokemon,
    primerPokemondb
}