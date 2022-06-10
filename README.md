<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Project

Cuenta con dos carpetas: `api` y `client`. En estas carpetas está el código del back-end y el front-end respectivamente.

En `api` se debe crear un archivo llamado: `.env` que tiene la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `pokemon`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es una aplicación en la cual se pueden ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

### Únicos Endpoints/Flags que se utilizaron

  - GET https://pokeapi.co/api/v2/pokemon
  - GET https://pokeapi.co/api/v2/pokemon/{id}
  - GET https://pokeapi.co/api/v2/pokemon/{name}
  - GET https://pokeapi.co/api/v2/type

#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se desarrollo una aplicación de React/Redux que contiene las siguientes pantallas/rutas.

__Pagina inicial__: landing page con
- [ ] Una imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: Contiene
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se ve el listado de pokemons. Al iniciar carga los primeros resultados obtenidos desde la ruta `GET /pokemons` y muestra su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.

__IMPORTANTE__: Dentro de la Ruta Principal se muestran tanto los pokemons traidos desde la API como así también las de la base de datos. La búsqueda esta limitada a 40 pokemons totales.

__Ruta de detalle de Pokemon__: Contiene
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__: Contiene
- [ ] Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle del Pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de Pokemon
- [ ] Botón/Opción para crear un nuevo Pokemon

> El formulario de creación esta validado con JavaScript.

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) *
  - Nombre *
  - Vida
  - Fuerza
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un pokemon puede pertenecer a más de un tipo y, a su vez, un tipo puede incluir a muchos pokemons.

#### Backend

Se Desarrollo un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Obtiene un listado de los pokemons desde pokeapi.
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtiene el detalle de un pokemon en particular
  - Trae solo los datos pedidos en la ruta de detalle de pokemon
  - Funcionar tanto para un id de un pokemon existente en pokeapi o uno creado en la base de datos
- [ ] __GET /pokemons?name="..."__:
  - Obtiene el pokemon que coincide exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado en la base de datos)
  - Si no existe ningún pokemon muestra un mensaje
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos
- [ ] __GET /types__:
  - Obtiene todos los tipos de pokemons posibles
  - En una primera instancia se traen desde pokeapi y se guardan en la base de datos y luego ya se utilizan desde allí

