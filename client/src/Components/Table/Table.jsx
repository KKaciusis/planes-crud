import React, { useEffect } from "react";
import Axios from 'axios';
import PlaneForTable from "./PlaneForTable";
import Table from 'react-bootstrap/Table'

function PlanesTable({setLastUpdate, lastUpdate, setPlanes, planes, showModal}) {

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
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Departure Town</th>
        <th>Arrival Time</th>
        <th>Is it late?</th>
        <th>Airline</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {planes.map((plane)=>(<PlaneForTable key={plane.id} id={plane.id} delete={deleteElement} showModal={showModal}  data={plane}></PlaneForTable>))}
    </tbody>
  </Table>
  )
}

export default PlanesTable;