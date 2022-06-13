import './App.css';
import { observer } from "mobx-react-lite";
import workspaceStore from ".//data/stores/workspaceStore";
import { Workspace } from './components/Workspace';
import Popup from './components/Popup';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage';


const App = observer(() => {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
    </>
  );
});

export default App;
