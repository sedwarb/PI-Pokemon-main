import './App.css';
import React from "react";
import NavBar from "./components/NavBar/NavBar";
//import Landing from "./components/landing/landing"
import { Route } from "react-router-dom";
import {Busqueda} from './components/Busqueda/Busqueda';

function App() {
  //<Landing />
  return (
    <React.Fragment>      
      <NavBar />
      
      <Route exact path="/" component={Busqueda}></Route>      
    </React.Fragment>
  );
}

export default App;
