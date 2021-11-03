import './Style/App.css';
import { useState, useEffect } from "react";
import NewPlane from './Components/Inputs/PlaneInput';
import Planes from './Components/Display/PlanesList';
import TopRow from './Components/Display/TopRow';
import EditPlane from './Components/Inputs/EditPlane';
import axios from 'axios';
import PlanesTable from './Components/Table/Table';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [planes, setPlanes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [modalId, setModalId] = useState(0);
  const [totalPlanes, setTotalPlanes] = useState(0);
  const [latePlanes, setLatePlanes] = useState(0);
  const [notLatePlanes, setNotLatePlanes] = useState(0);

  
  const getPlane = id => {
    if (id === 0){
        return {
          fromTown: '',
          isLate: '',
          arrivalTime: '',
          airline: ''
        };
    }

    for(let i = 0; i < planes.length; i++){
        if (planes[i].id === id){
            return {...planes[i]};
        } 
    }
};

const sortByTown = () => {
  let planesCopy = planes.slice()
  planesCopy = planesCopy.sort((a,b)=> b.from_town - a.from_town)
  setPlanes(planesCopy);
}
const sortByTownUp = () => {
  let planesCopy = planes.slice()
  planesCopy = planesCopy.sort((a,b)=> a.from_town - b.from_town)
  setPlanes(planesCopy);
}
const sortByLate = () => {
  let planesCopy = planes.slice()
  planesCopy = planesCopy.sort((a,b)=> b.is_late - a.is_late)
  setPlanes(planesCopy);
}
const sortByNotLate = () => {
  let planesCopy = planes.slice()
  planesCopy = planesCopy.sort((a,b)=> a.is_late - b.is_late)
  setPlanes(planesCopy);
}

const getTotalPlanes = () => {
  axios
  .get("http://localhost:3005/api/planes/totalPlanes")
  .then(function (response) {
    setTotalPlanes(response.data[0].totalPlanes)
  })
  .catch(function (error) {
    console.log(error);
  });
}

const getStatus = () => {
  axios
  .get("http://localhost:3005/api/planes/status")
  .then(function (response) {
    setLatePlanes(response.data[0].count)
    setNotLatePlanes(response.data[1].count)
  })
  .catch(function (error) {
    console.log(error);
  });
}

useEffect(() => {
  getTotalPlanes();
  getStatus();
}, [lastUpdate]);

const showModal = id => {
  setModalId(id)
}

const hideModal = () => {
  setModalId(0)
}

  return (
    <>
    <TopRow latePlanes={latePlanes} notLatePlanes={notLatePlanes} totalPlanes={totalPlanes} sortByNotLate={sortByNotLate} sortByLate={sortByLate} sortByTownUp={sortByTownUp} sortByTown={sortByTown} setIsOpen={setIsOpen}/>
    <Router>
    <Switch>
    <Route path="/grid" render={(props) => (<Planes {...props} setLastUpdate={setLastUpdate} planes={planes} setPlanes={setPlanes} lastUpdate={lastUpdate} showModal={showModal}/>)}/>
  </Switch>
  </Router>
    <NewPlane setLastUpdate={setLastUpdate} open={isOpen} setIsOpen={setIsOpen}/>
    <EditPlane setLastUpdate={setLastUpdate} id={modalId} plane={getPlane(modalId)} hideModal={hideModal}/>
    <Router>
    <Switch>
    <Route path="/table" render={(props) => (<PlanesTable {...props} setLastUpdate={setLastUpdate} planes={planes} setPlanes={setPlanes} lastUpdate={lastUpdate} showModal={showModal}></PlanesTable>)}/>
  </Switch>
  </Router>
  </>
  );
}

export default App;
