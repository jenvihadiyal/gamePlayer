import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddPlayer from "./components/AddPlayer";
import Player from "./components/Player";
import PlayersList from "./components/PlayerList";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  constant from './constant';

function App() {
  toast.configure()

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href={constant.player} className="navbar-brand">
          Player Game
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={constant.player} className="nav-link">
              Player List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={constant.addPlayer} className="nav-link">
              Add Player
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", constant.player]} component={PlayersList} />
          <Route exact path={constant.addPlayer} component={AddPlayer} />
          <Route path={constant.editPlayer} component={Player} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
