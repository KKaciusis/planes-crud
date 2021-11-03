import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Plane from "./Plane";

function Planes({setLastUpdate, lastUpdate, setPlanes, planes, showModal}) {

  useEffect(()=>{
    Axios.get('http://localhost:3005/api/planes').then((response) => {
      setPlanes(response.data);
    });
}, [lastUpdate])

const deleteElement = (id) => {
  if (window.confirm('Y U NO COW?!!?')) {
    Axios.delete('http://localhost:3005/api/planes/' + id).then(() => {
      setLastUpdate(Date.now())
  })
  }
};

  return(
    <div className="container">
    <div className="row">
        {planes.map((plane)=>(<Plane key={plane.id} id={plane.id} delete={deleteElement} showModal={showModal}  data={plane}></Plane>))}
    </div>
    </div>
  )
}

export default Planes;