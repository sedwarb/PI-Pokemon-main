import './App.css';
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/landing/landing"
import { Route } from "react-router-dom";
import {Busqueda} from './components/Busqueda/Busqueda';

function App() {
  //<NavBar />
  return (
    <React.Fragment>      
      <Route exact path="/" component={Landing}></Route>
      <Route path="/:x" component={NavBar}></Route>
      <Route exact path="/pokemons" component={Busqueda}></Route>      
    </React.Fragment>
  );
}

export default App;
