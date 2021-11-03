import * as React from 'react';

function Plane(props) {
    const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };

const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
const dateAsFormattedString = dateFormatter.format(new Date(props.data.arrival_time));

    return (
        <div className="card m-1" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">From: {props.data.from_town}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Arrival time: {dateAsFormattedString}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Is it late: {props.data.is_late === 1 ? "Yes" : "No"}</h6>
                <p className="card-text">Airline: {props.data.airline}</p>
                <button type="button" className="btn btn-light m-3" onClick={() => props.delete(props.data.id)}>DELETE SCOOTER</button>
                <button type="button" className="btn btn-warning" onClick={()=>props.showModal(props.data.id)}>Edit</button>
            </div>
        </div>
    )
}
export default Plane;