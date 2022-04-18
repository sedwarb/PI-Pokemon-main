import './App.css';
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/landing/Landing"
import { Route } from "react-router-dom";
import {Busqueda} from './components/Busqueda/Busqueda';
import {Detail} from './components/detail/detail'

function App() {
  //<NavBar />
  return (
    <React.Fragment>      
      <Route exact path="/" component={Landing}></Route>
      <Route path="/:x" component={NavBar}></Route>
      <Route exact path="/pokemons" component={Busqueda}></Route>
      <Route exact path="/pokemons/detail" component={Detail}></Route>
    </React.Fragment>
  );
}

export default App;
