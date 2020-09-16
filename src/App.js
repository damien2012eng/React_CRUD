import React from 'react';
import './App.css';
import EditForm from "./Router/EditForm";
import AddForm from "./Router/AddForm";
import List from "./Router/List"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"


function App(){
    return (
        <Router>
            <div>
                <Link to="/">Home</Link> {'    |    '}
                <Link to="/CPUs/2/edit">CPU ID 2</Link> {'    |    '}
                <Link to="/CPUs/add">Add New CPUs</Link> {'    |    '}
            </div>

            <Switch>
                <Route path="/" exact>
                    <List/>
                </Route>

                <Route path="/CPUs/:id/edit">
                    <EditForm/>
                </Route>

                <Route path="/CPUs/add">
                    <AddForm/>
                </Route>

            </Switch>
        </Router>
    )
}

export default App;
