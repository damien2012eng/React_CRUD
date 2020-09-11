import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetCpus from "./Component/GetCpus";
import DeleteCpu from "./Component/DeleteCpu";
import CreateCpu from "./Component/CreateCpu";
import UpdateCpu from "./Component/UpdateCpu";

function App() {
  return (
    <div className="App">
        {/*{<GetCpus/>}*/}
        {/*{<DeleteCpu/>}*/}
        {/*<CreateCpu/>*/}
        <UpdateCpu/>
    </div>
  );
}

export default App;
