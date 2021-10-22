import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Maintenance from "./components/Maintenance";
import AddMaintenance from "./components/AddMaintenance";
import EditMaintenance from "./components/EditMaintenance";
import DataTable from "./components/DataTable";

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/tutorials" className="navbar-brand">
                    bezKoder
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tutorials"} className="nav-link">
                            Tutorials
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/maintenancetable"} className="nav-link">
                            Maintenance
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route
                        exact
                        path={["/", "/tutorials"]}
                        component={TutorialsList}
                    />
                    <Route exact path="/add" component={AddTutorial} />
                    <Route path="/tutorials/:id" component={Tutorial} />
                    <Route exact path="/maintenance" component={Maintenance} />
                    <Route
                        exact
                        path="/maintenancetable"
                        component={DataTable}
                    />
                    <Route
                        exact
                        path="/maintenance/add"
                        render={(props) => <AddMaintenance />}
                    />
                    <Route
                        path="/maintenance/:id"
                        component={EditMaintenance}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
