import * as React from 'react';

function Plane(props) {
    var myDate = props.data.arrival_time;
    var date = new Date(myDate).toISOString().substring(0, 10);
    console.log(date)
    const time = new Date(myDate).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                 console.log(time);
    return (
        <div className="card m-1" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">From: {props.data.from_town}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Arrival Date: {date}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Arrival time: {time}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Is it late: {props.data.is_late === 1 ? "Yes" : "No"}</h6>
                <p className="card-text">Airline: {props.data.airline}</p>
                <button type="button" className="btn btn-light m-3" onClick={() => props.delete(props.data.id)}>DELETE SCOOTER</button>
                <button type="button" className="btn btn-warning" onClick={()=>props.showModal(props.data.id)}>Edit</button>
            </div>
        </div>
    )
}
export default Plane;