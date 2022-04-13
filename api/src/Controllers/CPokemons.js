const axios = require("axios")
const { response } = require("express")
const {Pokemon,poketipo,Tipo} = require("../db")
//Actualmente esta limitado a cinco (5) pokemon por request
const URL="https://pokeapi.co/api/v2/pokemon"
const limite = '?limit=5&offset=0'

async function getPokemons (req, res){
    let resultPokemons
        if(req.query.name){
            let dbPokemon
            try{
                dbPokemon=(await Pokemon.findOne(
                    {
                        where: {nombre: req.query.name},
                        attributes:['imagen','nombre'],
                        include: [
                            {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                        ]
                    }
                ))
                if(dbPokemon)res.json(dbPokemon)
            }catch{console.log('Error en busqueda de BD')}
            if(!isNaN(req.query.name)) res.send("Debe colocarse un Nombre no un ID")
            try{
                resultPokemons = (await axios.get(`${URL}/${req.query.name}`)).data
            }catch(error){
                res.status(501).send(`No Existe El Pokemon: ${req.query.name}`)
            }
            res.json({
                imagen:resultPokemons.sprites.other.dream_world.front_default,
                nombre:resultPokemons.forms[0].name,
                tipos:resultPokemons.types.map(p=>p.type.name)
            })
        }else{
            resultPokemons = (await axios.get(`${URL}${limite}`)).data.results
            .map(linkToPoke=>{
                return linkToPoke.url
            })

            let datosPoke = []
        
            for (let index = 0; index < resultPokemons.length; index++) {
                datosPoke.push((await axios.get(resultPokemons[index])).data)
            }
            let apiPokemon = datosPoke.map(p=>{
                return {
                    imagen:p.sprites.other.dream_world.front_default,
                    nombre:p.forms[0].name,
                    tipos:p.types.map(p=>p.type.name)
                }
            })
            let dbPokemon
            try{
                dbPokemon=(await Pokemon.findAll({attributes: ['imagen','nombre'],
                include: [
                    {model:Tipo,attributes:["nombre"],through:{attributes:[]}}
                ]
            }))
            }catch(error){
                console.log(`Hubo un Error de BD`)
                res.json(apiPokemon)
            }
            res.json(dbPokemon.concat(apiPokemon))        
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
                attributes:['imagen','nombre','vida','fuerza','defenza','velocidad','altura','peso'],
                include: [
                    {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                ]
            }
        ))
        if(!dbPokemon)console.log("No esta en la base de datos")
        else res.json({
            imagen:dbPokemon.imagen,
            nombre:dbPokemon.nombre,
            tipo:dbPokemon.tipos,
            estadisticas:[
                `Vida: ${dbPokemon.vida}`,
                `Fuerza: ${dbPokemon.fuerza}`,
                `Defenza: ${dbPokemon.defenza}`,
                `Velocidad: ${dbPokemon.velocidad}`
            ],
            altura: dbPokemon.altura,
            peso: dbPokemon.peso
        })
    }catch{
        console.log('Error al encontrar id en la BD')
    }
    let i = req.params.idPokemon
    if(i>10000) res.json("Id del Pokemon No Existe")
    else {resultPokemons = (await axios.get(`${URL}/${req.params.idPokemon}/`)).data}
    res.json(
        {
            id:resultPokemons.id,
            imagen:resultPokemons.sprites.other.dream_world.front_default,
            nombre:resultPokemons.forms[0].name,
            tipos:resultPokemons.types.map(p=>p.type.name),
            estadisticas:resultPokemons.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
            .map((r,i)=>{
                if(i===0)return `Vida: ${r.base_stat}`
                if(i===1)return `Fuerza: ${r.base_stat}`
                if(i===2)return `Defenza: ${r.base_stat}`
                if(i===3)return `Velocidad: ${r.base_stat}`
            }),
            altura:resultPokemons.height,
            peso:resultPokemons.weight

        }
    )
}

async function createPokemon(req, res){
    const {nombre, vida, fuerza, defenza, velocidad, altura, peso,tipo}= req.body
    const imangen1 = "https://pm1.narvii.com/6305/84ffa2658769b31eb8c7dd5c71105a39ae3467a4_hq.jpg"
    let pokemon={id:Date.now(),nombre:nombre.toLowerCase(), vida, fuerza, defenza, velocidad, altura, peso, imagen:imangen1}    
    Pokemon.create(pokemon)
    .then((response)=> {
        let Ctipo = {pokemonId:response.id,tipoId:tipo}
        if(typeof tipo === 'object'){
            tipo.forEach(e=>{
                Ctipo = {pokemonId:response.id,tipoId:e}
                poketipo.create(Ctipo)
            })
        }else{
            poketipo.create(Ctipo)
        }        
        res.send('Pokemon Creado Exitosamente')
    })    
    .catch(error=> console.log(error))
}

module.exports= {
    getPokemons,
    getPokemonsById,
    createPokemon
}